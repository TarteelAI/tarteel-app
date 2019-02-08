import uniqBy from 'lodash/uniqBy';

const initState = {
  count: 0,
  currentAyah: {
    line: "",
    surah: "",
    ayah: "",
    hash: 0
  },
  nextAyah: [],
  prevAyah: [],
  isLoadingAyah: false,
};

export default (state = initState  , action) => {
  switch (action.type) {
    case "SET_AYAHS":
      return ({
        ...state,
        count: action.val
      })
    case "INCREASE_AYAHS":
      return ({
        ...state,
        count: state.count + 1
      })
    case "SET_CURRENT_AYAH":
      return ({
        ...state,
        currentAyah: action.currentAyah
      })
    case 'SET_NEXT_AYAH' :
      return {
        ...state,
        nextAyah: uniqBy([
          ...state.nextAyah,
          action.payload,
        ], 'ayah'),
      }
    case 'UNSHIFT_NEXT':
      return {
        ...state,
        nextAyah: uniqBy([
          action.payload,
          ...state.nextAyah,
        ], 'ayah'),
      }
    case 'SHIFT_NEXT_AYAH' :
      return {
        ...state,
        nextAyah: state.nextAyah.slice(1),
      }
    case 'POP_NEXT_AYAH' :
      return {
        ...state,
        nextAyah: state.nextAyah.slice(0, 2),
      }
    case 'CLEAR_NEXT_AYAH' :
      return {
        ...state,
        nextAyah: [],
      }
    case 'SET_PREVIOUS_AYAH' :
      return {
        ...state,
        prevAyah: uniqBy([
          ...state.prevAyah,
          action.payload,
        ], 'ayah'),
      }
    case 'UNSHIFT_PREVIOUS' :
      return {
        ...state,
        prevAyah: uniqBy([
          action.payload,
          ...state.prevAyah,
        ], 'ayah'),
      }
    case 'SHIFT_PREV_AYAH':
      return {
        ...state,
        prevAyah: state.prevAyah.slice(1),
      }
    case 'POP_PREV_AYAH' :
      return {
        ...state,
        prevAyah: state.prevAyah.slice(0, 2),
      }
    case 'CLEAR_PREV_AYAH' :
      return {
        ...state,
        prevAyah: [],
      }
    case "TOGGLE_LOADING_AYAH":
      return ({
        ...state,
        isLoadingAyah: !state.isLoadingAyah,
      });
    default:
      return state
  }
}
