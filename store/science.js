import {
  ADD_CIRCLE,
  ADD_SQUARE,
  ADD_TRIANGLE,
  SUBTRACT_CIRCLE,
  SUBTRACT_SQUARE,
  SUBTRACT_TRIANGLE,
  GET_SCIENCE_RESULT,
  RESET_SCIENCE_CALCULATOR,
  TOGGLE_MODIFIER3,
  TOGGLE_MODIFIER6,
  SET_MODIFIER,
} from './science-mutation-types'
export const state = () => ({
  science: {
    square: {
      count: 0,
    },
    circle: {
      count: 0,
    },
    triangle: {
      count: 0,
    },
  },
  isModifier3: false,
  isModifier6: false,
  modifier: 0,
})
export const mutations = {
  [ADD_SQUARE](state) {
    state.science.square.count++
  },
  [ADD_CIRCLE](state) {
    state.science.circle.count++
  },
  [ADD_TRIANGLE](state) {
    state.science.triangle.count++
  },
  [SUBTRACT_SQUARE](state) {
    state.science.square.count--
    state.science.square.count =
      state.science.square.count <= 0 ? 0 : state.science.square.count
  },
  [SUBTRACT_CIRCLE](state) {
    state.science.circle.count--
    state.science.circle.count =
      state.science.circle.count <= 0 ? 0 : state.science.circle.count
  },
  [SUBTRACT_TRIANGLE](state) {
    state.science.triangle.count--
    state.science.triangle.count =
      state.science.triangle.count <= 0 ? 0 : state.science.triangle.count
  },
  [RESET_SCIENCE_CALCULATOR](state) {
    for (const key in state.science) {
      state.science[key].count = 0
    }
    state.modifier = 0
  },
  [TOGGLE_MODIFIER3](state) {
    state.isModifier3 = !state.isModifier3
  },
  [TOGGLE_MODIFIER6](state) {
    state.isModifier6 = !state.isModifier6
  },
  [SET_MODIFIER](state, value) {
    state.modifier = +value
  },
}
export const getters = {
  [GET_SCIENCE_RESULT](state) {
    let sum = 0
    const triangles = state.science.triangle.count
    const squares = state.science.square.count
    const circles = state.science.circle.count
    const combinationsCount = Math.min(triangles, squares, circles)
    sum += triangles * triangles
    sum += squares * squares
    sum += circles * circles
    sum += combinationsCount * (7 + state.modifier)
    return sum
  },
}
