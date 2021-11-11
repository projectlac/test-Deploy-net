<template>
  <div class="Effect">
    <div class="khung-bg"></div>
    <div class="fly"></div>
    <div class="fly2"></div>
    <div class="fly3"></div>
    <div class="redBG"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ChooseOmyoji extends Vue {
  onmyoji: Array<object> = [
    { id: 0, name: "Seimei" },
    { id: 1, name: "Kagura" },
    { id: 2, name: "Yao bikuni" },
    { id: 3, name: "Hiromasa" },
  ];
  chooseOnmy(val: number) {
    this.$emit("chooseOnmy", this.onmyoji[val]);
  }
}
</script>
