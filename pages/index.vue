<template>
  <div class="container">
    <form class="input-container" @submit.prevent="addPlayer">
      <input v-model="inputName" type="text" @focus="hideExpansions" />
      <button
        :disabled="isAddButtonDisabled"
        type="submit"
        class="button button_add"
      >
        Add
      </button>
    </form>
    <div class="expansions">
      <label for="close_expansion" class="button expansions__button_close">
        {{ expansionsButtonText }}
      </label>
      <input
        type="checkbox"
        id="close_expansion"
        @change="toggleExpansionsVisibility"
      />
      <div class="expansions__wrapper">
        <div
          class="expansions__content"
          :class="{ active: !isExpansionsHidden }"
        >
          <h3>Expansions</h3>
          <label>
            <input
              v-model="expansions"
              type="checkbox"
              value="cities"
              :checked="isCitiesExpansion"
              @change="isCitiesExpansion = !isCitiesExpansion"
            />
            <span class="custom-checkbox"></span>
            <span>Cities</span>
          </label>
          <label>
            <input
              v-model="expansions"
              type="checkbox"
              value="leaders"
              :checked="isLeadersExpansion"
              @change="isLeadersExpansion = !isLeadersExpansion"
            />
            <span class="custom-checkbox"></span>
            <span>Leaders</span>
          </label>
          <label>
            <input
              v-model="expansions"
              type="checkbox"
              value="babel"
              :checked="isBabelExpansion"
              @change="isBabelExpansion = !isBabelExpansion"
            />
            <span class="custom-checkbox"></span>
            <span>Babel</span>
          </label>
        </div>
      </div>
    </div>
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
        <div v-if="isCitiesExpansion" class="cell cities"></div>
        <div v-if="isLeadersExpansion" class="cell leaders"></div>
        <div v-if="isBabelExpansion" class="cell babel"></div>
        <div class="cell result">&sum;</div>
      </div>
      <div v-for="player in getPlayers" :key="player.id" class="column">
        <div class="cell">{{ player.name.slice(0, 4) }}</div>
        <template v-for="(points, name) in player.points">
          <div
            v-if="points.isVisible"
            :key="name"
            class="cell"
            :data-value="points.value"
            :data-name="name"
            :data-player="player.name"
            :data-player-id="player.id"
            @click="selectPoints($event)"
          >
            {{ points.value }}
          </div>
        </template>

        <div class="cell result">
          {{ player.result }}
        </div>
      </div>
    </div>
    <button
      v-if="false"
      class="button button_total"
      :class="{ isReady: isReady }"
      @click="showResults"
    >
      Total
    </button>
    <transition name="fade">
      <PointsModal
        v-if="isModalOpen"
        :dimension="6"
        :has-norm-button="false"
        :has-science-button="isScienceCell"
      />
    </transition>
    <transition name="fade">
      <PointsModal
        v-if="isBigNumbersModalOpen"
        :dimension="6"
        :start="36"
        :has-big-button="false"
        :has-science-button="isScienceCell"
      />
    </transition>
    <transition name="fade">
      <PointsModal
        v-if="isNegativeNumbersModalOpen"
        :dimension="4"
        :start="-16"
        :has-less-button="false"
        :has-science-button="isScienceCell"
      />
    </transition>
    <transition name="fade">
      <ScienceCalculator v-if="isScienceCalculatorModalOpen" />
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_SELECTED_CELL,
  ADD_PLAYER,
  SET_EXPANSIONS,
} from '~/store/mutation-types'
import { GET_PLAYER, GET_PLAYERS, GET_RESULTS } from '~/store/getters-types'
import PointsModal from '~/components/PointsModal'
import ScienceCalculator from '~/components/ScienceCalculator'
export default {
  components: { PointsModal, ScienceCalculator },
  data: () => ({
    isReady: false,
    isAddButtonDisabled: true,
    inputName: '',
    isScienceCell: false,
    isCitiesExpansion: false,
    isLeadersExpansion: false,
    isBabelExpansion: false,
    expansions: [],
    isExpansionsHidden: true,
  }),
  computed: {
    ...mapState({
      players: (state) => state.players,
      isModalOpen: (state) => state.isModalOpen,
      isBigNumbersModalOpen: (state) => state.isBigNumbersModalOpen,
      isNegativeNumbersModalOpen: (state) => state.isNegativeNumbersModalOpen,
      isScienceCalculatorModalOpen: (state) =>
        state.isScienceCalculatorModalOpen,
    }),
    getPlayers() {
      return this.GET_PLAYERS()
    },
    expansionsButtonText() {
      return this.isExpansionsHidden ? 'Show expansions' : 'Hide expansions'
    },
  },
  watch: {
    inputName() {
      this.inputName = this.inputName.trim()
      this.isAddButtonDisabled = this.inputName.trim() === ''
    },
    expansions() {
      this.SET_EXPANSIONS(this.expansions)
    },
  },
  methods: {
    selectPoints(event) {
      const target = event.target
      const dataset = target.dataset
      if (dataset.name === 'science') {
        this.isScienceCell = true
      } else {
        this.isScienceCell = false
      }
      // const { player, name, value, playerId } = dataset
      this.SET_SELECTED_CELL(dataset)
      this.OPEN_MODAL()
      this.hideExpansions()
    },
    hideExpansions() {
      this.isExpansionsHidden = true
    },
    toggleExpansionsVisibility() {
      this.isExpansionsHidden = !this.isExpansionsHidden
    },
    addPlayer() {
      this.ADD_PLAYER(this.inputName)
      this.inputName = ''
    },
    ...mapMutations([
      OPEN_MODAL,
      CLOSE_MODAL,
      SET_SELECTED_CELL,
      ADD_PLAYER,
      SET_EXPANSIONS,
    ]),
    ...mapGetters([GET_PLAYER, GET_RESULTS, GET_PLAYERS]),
  },
}
</script>

<style lang="scss" scoped>
@import '~/assets/general.scss';
@import '~/assets/mixins.scss';
@import '~/assets/colors.scss';
.container {
  width: 100vw;
  padding: 20px 18px 40px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.input-container {
  padding: 20px;
  background-color: $color-body;
  margin: 0 auto 24px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  position: sticky;
  top: 20px;
  z-index: 2;
  box-shadow: 0px 5px 10px rgba(128, 128, 128, 0.3);
  @include min(415) {
    max-width: 425px;
  }
  input {
    display: block;
    width: 100%;
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
    z-index: 1;
  }
  @include min(415) {
    margin-left: auto;
    margin-right: auto;
  }
}
.column {
  display: grid;
  row-gap: 2px;
  position: relative;
  .cell:first-child {
    font-size: 14px;
  }
  &.fields .result {
    font-size: 16px;
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
  &.cities {
    background-color: $color-black;
  }
  &.leaders {
    //background-color: $color-leaders;
    background-color: white;
    border: 4px solid $color-black;
    position: relative;
    &:after {
      content: 'o|-<';
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      transform: rotate(90deg);
      font-size: 14px;
    }
  }
  &.guilds {
    background-color: $color-guilds;
  }
  &.babel {
    position: relative;
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-color: $color-babel;
      clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
    }
  }
  &.result {
    background-color: $color-science-faded;
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
.expansions {
  position: relative;
  width: 100%;
  max-width: 425px;
  margin: 0 auto;
  margin-bottom: 24px;
  display: flex;
  justify-content: flex-end;
  h3 {
    margin-bottom: 16px;
  }
  label {
    margin-bottom: 16px;
    cursor: pointer;
    position: relative;
    padding-left: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    input {
      position: absolute;
      opacity: 0;
      height: 0;
      left: 0;
      top: 0;
      &:checked + .custom-checkbox {
        &:after {
          opacity: 1;
        }
      }
    }
  }
  &__wrapper {
    position: absolute;
    overflow: hidden;
    left: 0;
    top: 0;
    z-index: 2;
    padding: 10px;
  }
  &__content {
    //width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    background-color: white;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    padding: 16px;
    transform: translateX(-120%);
    &.active {
      transform: translateX(0);
    }
  }
}
.custom-checkbox {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid $color-culture;
  &:after {
    content: '';
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: $color-culture;
    opacity: 0;
    transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
}
.expansions .expansions__button_close {
  display: block;
  position: relative;
  z-index: 3;
  align-self: flex-end;
  & + input {
    position: absolute;
    visibility: hidden;
    opacity: 0;
    // &:checked + .expansions__wrapper .expansions__content {
    //   transform: translateX(0);
    // }
  }
}
</style>
