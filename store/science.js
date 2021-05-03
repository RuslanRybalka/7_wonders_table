import {
  ADD_CIRCLE,
  ADD_SQUARE,
  ADD_TRIANGLE,
  SUBTRACT_CIRCLE,
  SUBTRACT_SQUARE,
  SUBTRACT_TRIANGLE,
  GET_SCIENCE_RESULT,
  RESET_SCIENCE_CALCULATOR,
} from './science-mutation-types'
export const state = () => ({
  square: {
    count: 0,
  },
  circle: {
    count: 0,
  },
  triangle: {
    count: 0,
  },
})
export const mutations = {
  [ADD_SQUARE](state) {
    state.square.count++
  },
  [ADD_CIRCLE](state) {
    state.circle.count++
  },
  [ADD_TRIANGLE](state) {
    state.triangle.count++
  },
  [SUBTRACT_SQUARE](state) {
    state.square.count--
    state.square.count = state.square.count <= 0 ? 0 : state.square.count
  },
  [SUBTRACT_CIRCLE](state) {
    state.circle.count--
    state.circle.count = state.circle.count <= 0 ? 0 : state.circle.count
  },
  [SUBTRACT_TRIANGLE](state) {
    state.triangle.count--
    state.triangle.count = state.triangle.count <= 0 ? 0 : state.triangle.count
  },
  [RESET_SCIENCE_CALCULATOR](state) {
    for (const key in state) {
      state[key].count = 0
    }
  },
}
export const getters = {
  [GET_SCIENCE_RESULT](state) {
    let sum = 0
    const triangles = state.triangle.count
    const squares = state.square.count
    const circles = state.circle.count
    const combinationsCount = Math.min(triangles, squares, circles)
    sum += triangles * triangles
    sum += squares * squares
    sum += circles * circles
    sum += combinationsCount * 7
    return sum
  },
}
