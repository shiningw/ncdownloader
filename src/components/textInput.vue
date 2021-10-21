<template>
  <div class="text-input-link" id="text-input-link">
    <input
      type="text"
      name="text-input-value"
      id="text-input-value"
      v-bind:placeholder="placeholder"
      v-bind:data-type="dataType"
    />
  </div>
</template>
<script>
export default {
  name: "textinput",
  props: {
    placeholder: String,
    dataType: String,
  },
};
</script>
<style scoped lang="scss">
@import "../css/dl_variables.scss";
#text-input-link {
  position: relative;
  width: 100%;
  flex: 2;
  input {
    width: 100%;
    height: 100%;
    margin: 0px;
    background-color: $bg-color;
  }
}
@media only screen and (max-width: 1024px) {
  #text-input-link {
    width: 100%;
    & > input {
      width: 100%;
    }
    & > input:focus {
      border-color: #86b7fe;
      outline: 0;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
  }
}
</style>
