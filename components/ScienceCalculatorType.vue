<template>
  <div class="row">
    <button class="button" @click="$emit('subtract')">-</button>
    <div class="type" :class="typeClass"></div>
    <button class="button" @click="$emit('add')">+</button>
    <div class="total">{{ total }}</div>
  </div>
</template>
<script>
export default {
  name: 'ScienceCalculatorType',
  props: {
    typeClass: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    total: {
      type: Number,
      default: 0,
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/colors.scss';
.row {
  display: grid;
  width: 100%;
  grid-template-columns: 40px 1fr 40px 40px;
  column-gap: 16px;
}
.button {
  border: none;
  background-color: $color-science;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 100%;
  color: white;
  border-radius: 50%;
  padding: 0;
  margin: 0;
}
.type {
  background-color: $color-science;
  border-radius: 4px;
  position: relative;
  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    background-color: $color-trade;
  }
  &_square {
    &:after {
      width: 20px;
      border-radius: 4px;
    }
  }
  &_circle {
    &:after {
      border-radius: 50%;
    }
  }
  &_triangle {
    &:after {
      clip-path: polygon(50% 0%, 100% 100%, 95% 100%, 50% 5%, 5% 100%, 0% 100%);
    }
  }
}
.total {
  font-size: 24px;
  line-height: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
