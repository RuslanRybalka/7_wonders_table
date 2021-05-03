<template>
  <div class="calculator">
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
    <div class="calculator_result">Result: {{ getResult }}</div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import ScienceCalculatorType from './ScienceCalculatorType'
import {
  ADD_SQUARE,
  ADD_TRIANGLE,
  ADD_CIRCLE,
  SUBTRACT_SQUARE,
  SUBTRACT_TRIANGLE,
  SUBTRACT_CIRCLE,
  GET_SCIENCE_RESULT,
} from '~/store/science-mutation-types'
export default {
  name: 'ScienceCalculator',
  components: { ScienceCalculatorType },
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
    ...mapMutations('science', [
      ADD_CIRCLE,
      ADD_SQUARE,
      ADD_TRIANGLE,
      SUBTRACT_CIRCLE,
      SUBTRACT_SQUARE,
      SUBTRACT_TRIANGLE,
    ]),
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
.calculator_result {
  padding: 8px 16px;
  display: flex;
  background-color: white;
  font-size: 24px;
  margin-top: 32px;
}
</style>
