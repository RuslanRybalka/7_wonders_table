<template>
  <div class="container">
    <form class="input-container" @submit.prevent="addPlayer">
      <input v-model="inputName" type="text" />
      <button
        :disabled="isAddButtonDisabled"
        type="submit"
        class="button button_add"
      >
        Add
      </button>
    </form>
    <div class="table">
      <div class="column fields">
        <div class="cell"></div>
        <div class="cell war"></div>
        <div class="cell coins"></div>
        <div class="cell wonders"></div>
        <div class="cell culture"></div>
        <div class="cell science"></div>
        <div class="cell trade"></div>
        <div class="cell guilds"></div>
        <div class="cell black"></div>
        <div class="cell leaders"></div>
      </div>
      <div v-for="player in players" :key="player.id" class="column">
        <div class="cell">{{ player.name.slice(0, 4) }}</div>
        <div
          v-for="(value, name) in player.points"
          :key="name"
          class="cell"
          :data-value="value"
          :data-name="name"
          :data-player="player.name"
          :data-player-id="player.id"
          @click="selectPoints($event)"
        >
          {{ value }}
        </div>
      </div>
    </div>
    <button
      class="button button_total"
      :class="{ isReady: isReady }"
      @click="showResults"
    >
      Total
    </button>
    <transition name="fade">
      <PointsModal v-if="isModalOpen" :dimension="6" :hasNormButton="false" />
    </transition>
    <transition name="fade">
      <PointsModal
        v-if="isBigNumbersModalOpen"
        :dimension="6"
        :start="36"
        :hasBigButton="false"
      />
    </transition>
    <transition name="fade">
      <PointsModal
        v-if="isNegativeNumbersModalOpen"
        :dimension="4"
        :start="-16"
        :hasLessButton="false"
      />
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_PLAYER,
  SET_SELECTED_CELL,
  GET_RESULTS,
  ADD_PLAYER,
} from '~/store/mutation-types'
import '~/assets/general.scss'
import PointsModal from '~/components/PointsModal'
export default {
  components: { PointsModal },
  data: () => ({
    isReady: false,
    isAddButtonDisabled: true,
    inputName: '',
  }),
  computed: {
    ...mapState({
      players: (state) => state.players,
      isModalOpen: (state) => state.isModalOpen,
      isBigNumbersModalOpen: (state) => state.isBigNumbersModalOpen,
      isNegativeNumbersModalOpen: (state) => state.isNegativeNumbersModalOpen,
    }),
  },
  watch: {
    inputName() {
      this.inputName = this.inputName.trim()
      this.isAddButtonDisabled = this.inputName.trim() === ''
    },
  },
  methods: {
    selectPoints(event) {
      const target = event.target
      const dataset = target.dataset
      // const { player, name, value, playerId } = dataset
      this.SET_SELECTED_CELL(dataset)
      this.OPEN_MODAL()
    },
    showResults() {},
    addPlayer() {
      this.ADD_PLAYER(this.inputName)
      this.inputName = ''
    },
    ...mapMutations([OPEN_MODAL, CLOSE_MODAL, SET_SELECTED_CELL, ADD_PLAYER]),
    ...mapGetters([GET_PLAYER, GET_RESULTS]),
  },
}
</script>

<style lang="scss" scoped>
$color-war: #da4747;
$color-culture: #0085ff;
$color-science: #009334;
$color-trade: #f9f871;
$color-black: #1f1f1f;
$color-leaders: #99aae0;
$color-guilds: #9268ff;
$color-wonders: #aa7f00;
$color-coin-border: #dc6200;
.container {
  width: 100vw;
  height: 80vh;
  padding: 0 18px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.input-container {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  input {
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 14px;
    background-color: rgba(255, 255, 255, 0);
    border-bottom: 1px solid $color-black;
    padding: 0.5em 2em 0.5em 0;
  }
}
.button_add {
  margin-left: 16px;
  &:disabled {
    opacity: 0.7;
  }
}
.table {
  height: auto;
  max-width: calc(100vw - 36px);
  background-color: black;
  box-shadow: 10px 10px 10px rgba(128, 128, 128, 0.3);
  display: grid;
  grid-template-columns: 48px;
  grid-auto-columns: minmax(48px, 1fr);
  grid-auto-flow: column;
  column-gap: 2px;
  align-self: flex-start;
  overflow: auto;
  .column:first-child {
    position: sticky;
    left: 0;
  }
}
.column {
  display: grid;
  row-gap: 2px;
  .cell:first-child {
    font-size: 14px;
  }
}
.cell {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 40px;
  cursor: pointer;
  &:nth-of-type(odd) {
    background-color: rgb(255, 255, 255);
  }
  &:nth-of-type(even) {
    background-color: rgb(214, 214, 214);
  }
  &.war {
    background-color: $color-war;
  }
  &.coins {
    background-color: white;
    &:after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      background-color: $color-trade;
      border: 2px solid $color-coin-border;
    }
  }
  &.wonders {
    background-color: #fff;
    &:after {
      content: '';
      display: block;
      width: 0px;
      height: 0px;
      border: 24px solid $color-wonders;
      border-color: rgba(255, 255, 255, 0);
      border-bottom-color: $color-wonders;
      transform: translateY(-30%) scaleX(0.7);
    }
  }
  &.culture {
    background-color: $color-culture;
  }
  &.science {
    background-color: $color-science;
  }
  &.trade {
    background-color: $color-trade;
  }
  &.black {
    background-color: $color-black;
  }
  &.leaders {
    background-color: $color-leaders;
  }
  &.guilds {
    background-color: $color-guilds;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.button {
  display: block;
  border: none;
  outline: none;
  font-size: 14px;
  background-color: $color-culture;
  border-radius: 4px;
  padding: 0.5em 2em;
  color: white;
  display: flex;
  box-shadow: 0px 5px 10px rgba(128, 128, 128, 0.3);
  transition: opacity 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.button_total {
  font-size: 24px;
  margin-top: 32px;
  &:hover {
    opacity: 0.7;
  }
}
</style>
