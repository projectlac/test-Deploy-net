<template>
  <div class="Effect">
    <!-- <div class="khung-bg"></div> -->
    <div class="fly"></div>
    <div class="fly2"></div>
    <div class="fly3"></div>
    <div class="redBG" :class="hiddenMiddle"></div>
    <div class="centerAnimation" :class="hiddenMiddle">
      <div class="fightScene"></div>
      <div class="fightScene3"></div>
      <div class="fightScene4"></div>
      <div class="fightScene2">
        <p class="fightText">Chiến!</p>
      </div>
      <div class="leftArrow"></div>
      <div class="rightArrow"></div>
      <div class="fightCloud"></div>
      <div class="flower"></div>
      <div class="flower2"></div>
      <div class="bird">
        <div class="niao1"></div>
        <div class="niao2"></div>
        <div class="niao3"></div>
        <div class="niao4"></div>
        <div class="niao5"></div>
      </div>
    </div>
    <div class="cloud-left-top"></div>
    <div class="cloud-left-bottom"></div>
    <div class="cloud-right-top"></div>
    <div class="cloud-right-bottom"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class ChooseOmyoji extends Vue {
  @Prop() hiddenMiddle!: string;
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
