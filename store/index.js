import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CLOSE_MODALS,
  SET_SELECTED_POINTS_VALUE,
  GET_PLAYER,
  SET_SELECTED_CELL,
  GET_RESULTS,
  ADD_PLAYER,
  OPEN_BIG_NUMBERS_MODAL,
  CLOSE_BIG_NUMBERS_MODAL,
  OPEN_NEGATIVE_NUMBERS_MODAL,
  CLOSE_NEGATIVE_NUMBERS_MODAL,
  OPEN_SCIENCE_CALCULATOR_MODAL,
  CLOSE_SCIENCE_CALCULATOR_MODAL,
} from '~/store/mutation-types'

export const state = () => ({
  currentId: 0,
  players: [],
  isModalOpen: false,
  isBigNumbersModalOpen: false,
  isNegativeNumbersModalOpen: false,
  isScienceCalculatorModalOpen: false,
  selectedCell: {
    player: '',
    name: '',
    value: 0,
    playerId: undefined,
  },
})

export const mutations = {
  [ADD_PLAYER](state, name) {
    const player = {
      id: state.currentId,
      name,
      points: {
        war: undefined,
        coins: undefined,
        wonders: undefined,
        culture: undefined,
        science: undefined,
        trade: undefined,
        guilds: undefined,
        black: undefined,
        leaders: undefined,
      },
      result: 0,
    }
    state.players = [...state.players, player]
    state.currentId++
  },
  [OPEN_MODAL](state) {
    state.isModalOpen = true
    state.isBigNumbersModalOpen = false
    state.isNegativeNumbersModalOpen = false
    state.isScienceCalculatorOpen = false
  },
  [CLOSE_MODAL](state) {
    state.isModalOpen = false
  },
  [CLOSE_MODALS](state) {
    state.isModalOpen = false
    state.isNegativeNumbersModalOpen = false
    state.isBigNumbersModalOpen = false
    state.isScienceCalculatorModalOpen = false
  },
  [SET_SELECTED_POINTS_VALUE](state, value) {
    const target = state.selectedCell
    const player = state.players.find((player) => {
      return player.id === +state.selectedCell.playerId
    })
    player.points[target.name] = value
    player.result += value
  },
  [SET_SELECTED_CELL](state, cell) {
    state.selectedCell = { ...cell }
  },
  [OPEN_NEGATIVE_NUMBERS_MODAL](state) {
    state.isNegativeNumbersModalOpen = true
    state.isBigNumbersModalOpen = false
    state.isModalOpen = false
    state.isScienceCalculatorOpen = false
  },
  [CLOSE_NEGATIVE_NUMBERS_MODAL](state) {
    state.isNegativeNumbersModalOpen = false
  },
  [OPEN_BIG_NUMBERS_MODAL](state) {
    state.isBigNumbersModalOpen = true
    state.isModalOpen = false
    state.isNegativeNumbersModalOpen = false
    state.isScienceCalculatorOpen = false
  },
  [CLOSE_BIG_NUMBERS_MODAL](state) {
    state.isBigNumbersModalOpen = false
  },
  [OPEN_SCIENCE_CALCULATOR_MODAL](state) {
    closeAllModals(state)
    state.isScienceCalculatorModalOpen = true
  },
  [CLOSE_SCIENCE_CALCULATOR_MODAL](state) {
    state.isScienceCalculatorOpen = false
  },
}

export const getters = {
  [GET_PLAYER](state, id) {
    const player = state.players.find((player) => {
      return player.id === ~~id
    })
    return player
  },
  [GET_RESULTS](state) {
    const results = []
    state.players.forEach((player) => {
      results.push({ name: player.name, result: player.result })
    })
    return results
  },
}

function closeAllModals(state) {
  state.isScienceCalculatorOpen = false
  state.isModalOpen = false
  state.isBigNumbersModalOpen = false
  state.isNegativeNumbersModalOpen = false
}
