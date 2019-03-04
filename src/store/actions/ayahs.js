import { AsyncStorage } from "react-native"
import { setLastAyah } from "../../utils/index"
import showError from "../../utils/showError";
import {surahs} from "../../components/PickSurah/surahs";
import {getNextAyah, getPrevAyah} from "../../utils/ayahs";

const API_URL = 'https://apiv1.tarteel.io';

export const setAyahs = (val) => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('ayahsCount', String(val))
      dispatch({
        type: "SET_AYAHS",
        val
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

export const getAyahs = () => {
  return async (dispatch, getState) => {
    try {
      const val = await AsyncStorage.getItem('ayahsCount')
      dispatch({
        type: "SET_AYAHS",
        val: Number(val)
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

export const increaseAyahs = () => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('ayahsCount', String(getState().ayahs.count + 1))
      dispatch({
        type: "INCREASE_AYAHS"
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

export const setRandomAyah = () => {
  return async (dispatch, getState) => {
    const sessionId = getState().data.sessionId;
    dispatch(toggleLoadingAyah())
    return fetch(`${API_URL}/get_ayah`, {
      headers: {
        "Content-Type": "application/json",
        'Cookie': `sessionid=${sessionId}`,
      }
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setStaticAyah(json))
        dispatch(toggleLoadingAyah())
        setLastAyah(json)
      })
      .catch(e => {
        showError(e.message)
      })
  }
}

export const setSpecificAyah = (surah, ayah) => {
  return async (dispatch, getState) => {
    const sessionId = getState().data.sessionId;
    return fetch(`${API_URL}/get_ayah/`, {
      method: "POST",
      body: JSON.stringify({surah, ayah}),
      headers: {
        "Content-Type": "application/json",
        'Cookie': `sessionid=${sessionId}`,
      }
    })
      .then(res => res.json())
      .then(json => {
        dispatch(setStaticAyah(json));
        setLastAyah(json)
      })
      .catch(e => {
        console.log(e.message)
        showError(e.message)
      })
  }
}


export const setStaticAyah = (currentAyah) => {
  return ({
    type: "SET_CURRENT_AYAH",
    currentAyah
  })
}

export const unShiftNextAyah = (ayah) => {
  return({
    type: 'UNSHIFT_NEXT',
    payload: ayah
  })
}

export const shiftNextAyah = () => {
  return {
    type: 'SHIFT_NEXT_AYAH'
  }
}

export const popNextAyah = () => {
  return {
    type: 'POP_NEXT_AYAH',
  }
}

export const clearNextAyah = () => {
  return {
    type: 'CLEAR_NEXT_AYAH',
  }
}

export const unShiftPrevAyah = (ayah) => {
  return ({
    type: 'UNSHIFT_PREVIOUS',
    payload: ayah
  })
}

export const shiftPrevAyah = () => {
  return {
    type: 'SHIFT_PREV_AYAH',
  }
}

export const popPrevAyah = () => {
  return {
    type: 'POP_PREV_AYAH',
  }
}
export const clearPrevAyah = () => {
  return {
    type: 'CLEAR_PREV_AYAH',
  }
}

export const loadNextQueue = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve) => {
      while (getState().ayahs.nextAyah.length < 3) {
        const ayah = getState().ayahs.nextAyah.slice(-1)[0];
        await dispatch(loadNextAyah(ayah));
      }
      if (getState().ayahs.nextAyah[0].ayah === getState().ayahs.currentAyah.ayah) {
        await dispatch(shiftNextAyah());
        dispatch(loadNextQueue());
      }
      resolve();
    })
  }
}

export const loadPrevQueue = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve) => {
      while (getState().ayahs.prevAyah.length < 3) {
        const ayah = getState().ayahs.prevAyah.slice(-1)[0];
        await dispatch(loadPreviousAyah(ayah));
      }
      if (getState().ayahs.prevAyah[0].ayah === getState().ayahs.currentAyah.ayah) {
        await dispatch(shiftPrevAyah());
        dispatch(loadPrevQueue());
      }
      resolve();
    })
  }
}

export const loadNextAyah = (currentAyah) => {
  return (dispatch, getState) => {
    const { ayah, surah } = currentAyah || getState().ayahs.currentAyah;
    const {nextSurah, nextAyah} = getNextAyah(surah, ayah);
    const body = {
      surah: nextSurah,
      ayah: nextAyah,
    }
    return fetchData(body, getState().data.sessionId)
      .then(json => {
        dispatch(setNextAyah(json))
      })
      .catch(e => {
        console.log(e.message)
        showError(e.message)
      })
  }
}

export const loadPreviousAyah = (currentAyah) => {
  return (dispatch, getState) => {
    const { ayah, surah } = currentAyah || getState().ayahs.currentAyah;
    const {prevSurah, prevAyah} = getPrevAyah(surah, ayah);
    const body = {
      surah: prevSurah,
      ayah: String(prevAyah)
    }

    return fetchData(body, getState().data.sessionId)
      .then(json => {
        dispatch(setPreviousAyah(json))
      })
      .catch(e => {
        console.log(e.message)
        showError(e.message)
      })

  }
};

const fetchData = (body, sessionId) => {
  console.log(body)
  return fetch(`${API_URL}/get_ayah/`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      'Cookie': `sessionid=${sessionId}`,
    }
  })
    .then(res => res.json())
};

export const setNextAyah = (ayah) => {
  return ({
    type: "SET_NEXT_AYAH",
    payload: ayah
  })
};

export const setPreviousAyah = (ayah) => {
  return ({
    type: "SET_PREVIOUS_AYAH",
    payload: ayah,
  })
};

export const toggleLoadingAyah = () => {
  return ({
    type: "TOGGLE_LOADING_AYAH",
  })
};

