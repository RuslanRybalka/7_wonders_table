import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CLOSE_MODALS,
  SET_SELECTED_POINTS_VALUE,
  SET_SELECTED_CELL,
  ADD_PLAYER,
  OPEN_BIG_NUMBERS_MODAL,
  CLOSE_BIG_NUMBERS_MODAL,
  OPEN_NEGATIVE_NUMBERS_MODAL,
  CLOSE_NEGATIVE_NUMBERS_MODAL,
  OPEN_SCIENCE_CALCULATOR_MODAL,
  CLOSE_SCIENCE_CALCULATOR_MODAL,
  SET_EXPANSIONS,
} from '~/store/mutation-types'

import { GET_PLAYER, GET_RESULTS, GET_PLAYERS } from '~/store/getters-types'

export const state = () => ({
  currentId: 0,
  players: [],
  expansions: [],
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
        war: {
          value: undefined,
          isVisible: true,
        },
        coins: {
          value: undefined,
          isVisible: true,
        },
        wonders: {
          value: undefined,
          isVisible: true,
        },
        culture: {
          value: undefined,
          isVisible: true,
        },
        science: {
          value: undefined,
          isVisible: true,
        },
        trade: {
          value: undefined,
          isVisible: true,
        },
        guilds: {
          value: undefined,
          isVisible: true,
        },
        cities: {
          value: undefined,
          isVisible: state.expansions.includes('cities'),
        },
        leaders: {
          value: undefined,
          isVisible: state.expansions.includes('leaders'),
        },
        babel: {
          value: undefined,
          isVisible: state.expansions.includes('babel'),
        },
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
    player.points[target.name].value = value
    let result = 0
    for (const key in player.points) {
      result += player.points[key].value || 0
    }
    player.result = result
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
  [SET_EXPANSIONS](state, expansions) {
    state.players.forEach((player) => {
      const expansionsResults = {
        cities: player.points.cities.value,
        leaders: player.points.leaders.value,
        babel: player.points.babel.value,
      }
      player.points.cities = {
        value: undefined,
        isVisible: false,
      }
      player.points.leaders = {
        value: undefined,
        isVisible: false,
      }
      player.points.babel = {
        value: undefined,
        isVisible: false,
      }
      expansions.forEach((exp) => {
        player.points[exp].value = expansionsResults[exp]
        player.points[exp].isVisible = true
      })
      let result = 0
      for (const key in player.points) {
        result += player.points[key].value || 0
      }
      player.result = result
    })
    state.expansions = [...expansions]
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
  [GET_PLAYERS](state) {
    return state.players
  },
}

function closeAllModals(state) {
  state.isScienceCalculatorOpen = false
  state.isModalOpen = false
  state.isBigNumbersModalOpen = false
  state.isNegativeNumbersModalOpen = false
}
