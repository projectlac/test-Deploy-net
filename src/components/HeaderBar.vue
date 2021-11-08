<template>
  <div class="HeaderBar" :class="{ doneBanpick: countClick == 16 }">
    <v-row class="ma-0">
      <div class="scoreBlue">1</div>
      <div class="nameBlue">Player1</div>
      <div class="matchNumber">Trận 1</div>
      <div class="nameRed">Player2</div>
      <div class="scoreRed">1</div>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  @Prop() countClick!: number;
}
</script>
