<template>
  <label :for="name" :class="{ active: isActive }" class="toggle-button">
    <span class="toggle-label">{{ text }}</span>
    <input
      type="checkbox"
      :disabled="disabled"
      :id="name"
      :name="name"
      :value="value"
      v-model="inputValue"
    />
    <span class="toggle-switch"></span>
  </label>
</template>

<script>
export default {
  name: "toggleButton",
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    enabledText: {
      type: String,
      default: "On",
    },

    disabledText: {
      type: String,
      default: "Off",
    },

    name: {
      type: String,
      default: "check-button",
    },

    defaultStatus: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},

  data() {
    return {
      status: this.defaultStatus,
    };
  },

  watch: {
    defaultStatus() {
      this.status = Boolean(this.defaultStatus);
    },
  },

  computed: {
    isActive() {
      return this.status;
    },

    text() {
      return this.status ? this.disabledText : this.enabledText;
    },
    inputValue: {
      get() {
        return this.status;
      },

      set(value) {
        this.status = value;
        this.$emit("changed", this.name,value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
$toggle-height: 25px;
$toggle-width: 45px;
$bg-color: #e5e5ee;

.toggle-button,
.toggle-label {
  user-select: none;
  cursor: pointer;
}

.toggle-button,
.toggle-label,
.toggle-switch {
  vertical-align: middle;
}

.toggle-button input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  width: 1px;
  height: 1px;
}

.toggle-button .toggle-switch {
  display: inline-block;
  height: $toggle-height;
  border-radius: $toggle-height / 3;
  width: $toggle-width;
  background: $bg-color;
  box-shadow: inset 0 0 1px #b1bbc7;
  position: relative;
  margin-left: 6px;
  transition: all 0.25s;
}

.toggle-button .toggle-switch::after {
  content: "";
  position: absolute;
  display: block;
  height: $toggle-height;
  width: $toggle-width / 2;
  border-radius: 50%;
  left: 0;
  transform: translateX(0);
  transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
}

.toggle-button .toggle-switch::after {
  background: #ffffff;
  box-shadow: 0 0 1px #666;
}

.active .toggle-switch {
  background: #adedcb;
  box-shadow: inset 0 0 1px #adedcb;
}

.active .toggle-switch::after {
  transform: translateX($toggle-width / 2);
  background: #488c68;
  box-shadow: 0 0 1px #53b883;
}
</style>
