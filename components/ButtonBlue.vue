<template>
  <button type="submit" class="button">Add</button>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
@import '~/assets/colors.scss';
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
</style>
