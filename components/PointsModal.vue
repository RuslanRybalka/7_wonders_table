<template>
  <div class="modal" @click.self="CLOSE_MODAL">
    <div class="table" :class="dimensionClass">
      <div
        v-for="(value, index) in points"
        :key="index"
        :data-value="index"
        class="point-cell"
        @click="selectPointsValue(index)"
      >
        {{ index }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { CLOSE_MODAL, SET_SELECTED_POINTS_VALUE } from '~/store/mutation-types'
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
      this.CLOSE_MODAL()
    },
    ...mapMutations([CLOSE_MODAL, SET_SELECTED_POINTS_VALUE]),
  },
}
</script>
<style scoped lang="scss">
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
}
</style>
