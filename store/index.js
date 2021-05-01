import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_SELECTED_POINTS_VALUE,
  GET_PLAYER,
  SET_SELECTED_CELL,
  GET_RESULTS,
  ADD_PLAYER,
} from '~/store/mutation-types'

export const state = () => ({
  currentId: 0,
  players: [],
  isModalOpen: false,
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
  },
  [CLOSE_MODAL](state) {
    state.isModalOpen = false
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
