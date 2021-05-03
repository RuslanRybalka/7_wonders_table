<template>
  <div class="modal" @click.self="CLOSE_MODALS">
    <div class="table" :class="dimensionClass">
      <button
        v-if="hasLessButton"
        class="point-cell button_less"
        @click="OPEN_NEGATIVE_NUMBERS_MODAL"
      >
        less
      </button>
      <button
        v-if="hasNormButton"
        class="point-cell button_norm"
        @click="OPEN_MODAL"
      >
        ...
      </button>
      <button
        v-if="hasBigButton"
        class="point-cell button_more"
        @click="OPEN_BIG_NUMBERS_MODAL"
      >
        more
      </button>
      <button
        v-if="hasScienceButton"
        class="point-cell button_science"
        @click="openScienceCalculator"
      >
        Calculator
      </button>
      <div
        v-for="(value, index) in points"
        :key="index"
        :data-value="start + index"
        class="point-cell"
        @click="selectPointsValue(start + index)"
      >
        {{ start + index }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {
  OPEN_MODAL,
  CLOSE_MODALS,
  OPEN_BIG_NUMBERS_MODAL,
  OPEN_NEGATIVE_NUMBERS_MODAL,
  OPEN_SCIENCE_CALCULATOR_MODAL,
  SET_SELECTED_POINTS_VALUE,
} from '~/store/mutation-types'
export default {
  name: 'PointsModal',
  data: () => ({
    points: [],
  }),
  props: {
    dimension: {
      type: Number,
      default: 0,
    },
    start: {
      type: Number,
      default: 0,
    },
    hasLessButton: {
      type: Boolean,
      default: true,
    },
    hasNormButton: {
      type: Boolean,
      default: true,
    },
    hasBigButton: {
      type: Boolean,
      default: true,
    },
    hasScienceButton: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.points = new Array(this.dimension * this.dimension)
  },
  computed: {
    dimensionClass() {
      return 'd-' + this.dimension
    },
    ...mapState({
      selectedPointsValue: (state) => state.selectedPointsValue,
    }),
  },
  methods: {
    selectPointsValue(value) {
      this.SET_SELECTED_POINTS_VALUE(value)
      this.CLOSE_MODALS()
    },
    openScienceCalculator() {
      this.OPEN_SCIENCE_CALCULATOR_MODAL()
    },
    ...mapMutations([
      OPEN_MODAL,
      CLOSE_MODALS,
      SET_SELECTED_POINTS_VALUE,
      OPEN_NEGATIVE_NUMBERS_MODAL,
      OPEN_BIG_NUMBERS_MODAL,
      OPEN_SCIENCE_CALCULATOR_MODAL,
    ]),
  },
}
</script>
<style scoped lang="scss">
@import '~/assets/colors.scss';
.modal {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.table {
  display: grid;
  column-gap: 2px;
  row-gap: 2px;
  position: absolute;
  @for $i from 1 to 10 {
    &.d-#{$i} {
      grid-template-columns: repeat($i, 1fr);
    }
  }
}
.point-cell {
  width: 40px;
  height: 40px;
  background-color: white;
  background-size: 38px 38px;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  border: none;
}
.button_less,
.button_more,
.button_norm,
.button_science {
  position: absolute;
  bottom: calc(100% + 20px);
  font-size: 14px;
}
.button_more {
  right: 0;
}
.button_less {
  left: 0;
}
.button_norm {
  left: 50%;
  transform: translateX(-50%);
}
.button_science {
  width: 100%;
  bottom: calc(100% + 82px);
  background: $color-science;
  color: white;
}
</style>
