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
@import "../css/variables.scss";
#text-input-link {
  position: relative;
  width: 100%;
  flex: 2;
  input {
    width: 100%;
    height: 100%;
    margin: 0px;
    background-color: var(--color-main-background, $bg-color);
    color: var(--color-main-text, #181616);
    font-size: medium;
    border-radius: 0em;
    border: 1px solid var(--color-border, #ccc);
    &:focus {
      border-color: var(--color-primary-element, #0082c9);
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 130, 201, 0.25);
    }
  }
}
@media only screen and (max-width: 1024px) {
  #text-input-link {
    width: 100%;
    & > input {
      width: 100%;
    }
  }
}
@media only screen and (max-width: 600px) {
  #text-input-link {
    input {
      font-size: smaller;
      min-height: 44px;
    }
  }
}
</style>
