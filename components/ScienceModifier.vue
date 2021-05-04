<template>
  <label :class="{ 'is-checked': checked }">
    <span>{{ '+' + modifier }}</span>
    <input
      v-model="value"
      type="radio"
      name="modifier"
      :value="modifier"
      @change="toggle"
    />
  </label>
</template>
<script>
export default {
  name: 'ScienceModifier',
  props: {
    modifier: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    toggle() {
      this.checked = !this.checked
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/colors.scss';
label {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: white;
  font-size: 24px;
  color: black;
  transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  &.is-checked {
    background-color: $color-science;
    color: white;
  }
}
input {
  position: absolute;
  opacity: 0;
  visibility: hidden;
}
</style>
