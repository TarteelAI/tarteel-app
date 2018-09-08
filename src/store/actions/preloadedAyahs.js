import { Image } from "react-native"
import {surahs} from "../../components/PickSurah/surahs";
import showError from "../../utils/showError";


export const loadPreviousAyah = () => {
  return (dispatch, getState) => {
    const { ayah, surah } = getState().ayahs.currentAyah
    let body = {}
    const prevAyah = Number(ayah) - 1
    if(ayah == 1) {
      if(surah == 1) {
        body = {
          surah: String(114),
          ayah: surahs[114].ayah
        }
      } else {
        const prevSurah = Number(surah) - 1
        body = {
          surah: String(prevSurah),
          ayah: surahs[prevSurah].ayah
        }
      }
    }
    else {
      body = {
        surah,
        ayah: String(prevAyah)
      }
    }

    fetchData(body)
      .then(json => {
        dispatch(setPreviousAyah(json))
        Image.prefetch("https://tarteel.io" + json.image_url)
      })
      .catch(e => {
        console.log(e.message)
        showError(e.message)
      })

  }
}

export const loadNextAyah = () => {
  return (dispatch, getState) => {
    const { ayah, surah } = getState().ayahs.currentAyah
    const nextAyah = Number(ayah) + 1
    let body = {}
    if(surahs[surah]["ayah"] == nextAyah - 1) {
      if(surah == "114" && ayah == "6") {
        body = {
          surah: String(1),
          ayah: String(1)
        }
      } else {
        const nextSurah = Number(surah) + 1
        body = {
          surah: String(nextSurah),
          ayah: String(1)
        }
      }
    }
    else {
      body = {
        surah,
        ayah: String(nextAyah)
      }
    }
    fetchData(body)
      .then(json => {
        dispatch(setNextAyah(json))
        Image.prefetch("https://tarteel.io" + json.image_url)
      })
      .catch(e => {
        console.log(e.message)
        showError(e.message)
      })
  }
}

const fetchData = (body) => {
  console.log(body)
  return fetch("https://tarteel.io/get_ayah/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
}

export const setNextAyah = (ayah) => {
  return ({
    type: "SET_NEXT_AYAH",
    ayah
  })
}

export const setPreviousAyah = (ayah) => {
  return ({
    type: "SET_PREVIOUS_AYAH",
    ayah
  })
}