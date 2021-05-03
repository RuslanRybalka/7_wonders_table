<template>
  <div class="calculator" @click.self="CLOSE_MODALS">
    <div class="calculator__inner">
      <ScienceCalculatorType
        type-class="type_square"
        type="square"
        :total="squareCount"
        @add="ADD_SQUARE"
        @subtract="SUBTRACT_SQUARE"
      />
      <ScienceCalculatorType
        type-class="type_circle"
        type="circle"
        :total="circleCount"
        @add="ADD_CIRCLE"
        @subtract="SUBTRACT_CIRCLE"
      />
      <ScienceCalculatorType
        type-class="type_triangle"
        type="triangle"
        :total="triangleCount"
        @add="ADD_TRIANGLE"
        @subtract="SUBTRACT_TRIANGLE"
      />
    </div>
    <div class="calculator__result">
      Result: <span>{{ getResult }}</span>
      <div class="calculator__result-button">
        <ButtonBlue @clickEvent="addScienceResult" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import ScienceCalculatorType from '~/components/ScienceCalculatorType'
import ButtonBlue from '~/components/ButtonBlue'
import {
  ADD_SQUARE,
  ADD_TRIANGLE,
  ADD_CIRCLE,
  SUBTRACT_SQUARE,
  SUBTRACT_TRIANGLE,
  SUBTRACT_CIRCLE,
  GET_SCIENCE_RESULT,
  RESET_SCIENCE_CALCULATOR,
} from '~/store/science-mutation-types'
import { CLOSE_MODALS, SET_SELECTED_POINTS_VALUE } from '~/store/mutation-types'
export default {
  name: 'ScienceCalculator',
  components: { ScienceCalculatorType, ButtonBlue },
  computed: {
    ...mapState('science', {
      squareCount: (state) => state.square.count,
      circleCount: (state) => state.circle.count,
      triangleCount: (state) => state.triangle.count,
    }),
    getResult() {
      return this.GET_SCIENCE_RESULT()
    },
  },
  methods: {
    addScienceResult() {
      this.SET_SELECTED_POINTS_VALUE(this.getResult)
      this.CLOSE_MODALS()
      this.RESET_SCIENCE_CALCULATOR()
    },
    ...mapMutations('science', [
      ADD_CIRCLE,
      ADD_SQUARE,
      ADD_TRIANGLE,
      SUBTRACT_CIRCLE,
      SUBTRACT_SQUARE,
      SUBTRACT_TRIANGLE,
      RESET_SCIENCE_CALCULATOR,
    ]),
    ...mapMutations([CLOSE_MODALS, SET_SELECTED_POINTS_VALUE]),
    ...mapGetters('science', [GET_SCIENCE_RESULT]),
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/colors.scss';
.calculator {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $color-modal-bg;
  padding: 18px;
  position: fixed;
  top: 0;
  left: 0;
}
.calculator__inner {
  width: 100%;
  max-width: 425px;
  padding: 24px 32px;
  background-color: #fff;
  display: grid;
  row-gap: 16px;
  grid-template-columns: 1fr;
}
.calculator__result {
  padding: 8px 16px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background-color: white;
  font-size: 24px;
  margin-top: 32px;
  span {
    margin-left: auto;
  }
  &-button {
    margin-left: 16px;
  }
}
</style>
