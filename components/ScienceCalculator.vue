<template>
  <div class="calculator" @click.self="CLOSE_MODALS">
    <div class="calculator__container">
      <div class="calculator__modifiers">
        <label>
          <input
            v-model="modifier"
            checked
            type="radio"
            name="modifier"
            value="0"
            @change="setModifier(modifier)"
          />
          <span>0</span>
        </label>
        <label>
          <input
            v-model="modifier"
            type="radio"
            name="modifier"
            value="3"
            @change="setModifier(modifier)"
          />
          <span>+3</span>
        </label>
        <label>
          <input
            v-model="modifier"
            type="radio"
            name="modifier"
            value="6"
            @change="setModifier(modifier)"
          />
          <span>+6</span>
        </label>
      </div>
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
  SET_MODIFIER,
} from '~/store/science-mutation-types'
import { CLOSE_MODALS, SET_SELECTED_POINTS_VALUE } from '~/store/mutation-types'
export default {
  name: 'ScienceCalculator',
  components: { ScienceCalculatorType, ButtonBlue },
  data() {
    return {
      modifier: 0,
    }
  },
  computed: {
    ...mapState('science', {
      squareCount: (state) => state.science.square.count,
      circleCount: (state) => state.science.circle.count,
      triangleCount: (state) => state.science.triangle.count,
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
    setModifier(modifier) {
      this.SET_MODIFIER(this.modifier)
    },
    ...mapMutations('science', [
      ADD_CIRCLE,
      ADD_SQUARE,
      ADD_TRIANGLE,
      SUBTRACT_CIRCLE,
      SUBTRACT_SQUARE,
      SUBTRACT_TRIANGLE,
      RESET_SCIENCE_CALCULATOR,
      SET_MODIFIER,
    ]),
    ...mapMutations([CLOSE_MODALS, SET_SELECTED_POINTS_VALUE]),
    ...mapGetters('science', [GET_SCIENCE_RESULT]),
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/colors.scss';
@import '~/assets/mixins.scss';
.calculator {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $color-modal-bg;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.calculator__container {
  width: 100%;
  padding: 18px;
  @include min(415) {
    max-width: 425px;
  }
}
.calculator__modifiers {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 32px;
  label:not(:first-child) {
    margin-left: 32px;
  }
  input {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    & + span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background-color: white;
      font-size: 24px;
      color: black;
      transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    &:checked {
      & + span {
        background-color: $color-science;
        color: white;
      }
    }
  }
}
.calculator__inner {
  width: 100%;
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
