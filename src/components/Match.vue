<template>
  <div class="Match" :class="{ doneBanpick: countClick == 16 }">
    <h2>Vòng 1</h2>
    <div class="table">
      <v-data-table
        :headers="headers"
        :items="desserts"
        hide-default-header
        class="elevation-1"
        hide-default-footer
      ></v-data-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Match extends Vue {
  @Prop() countClick!: number;
  headers: Array<object> = [
    { text: "Tỷ số", value: "score1", align: "center" },
    { text: "Blue", value: "player1", align: "center" },
    { text: "VS", value: "VS", align: "center" },
    { text: "Red", value: "player2", align: "center" },
    { text: "Tỷ số", value: "score2", align: "center" },
  ];
  desserts: Array<object> = [
    {
      score1: "1",
      player1: "Frozen Yogurt",
      VS: "VS",
      score2: "2",
      player2: "Player2",
    },
    {
      score1: "1",
      player1: "Frozen2",
      VS: "VS",
      score2: "2",
      player2: "Player1",
    },
    {
      score1: "1",
      player1: "Frozen1",
      VS: "VS",
      score2: "2",
      player2: "Player4",
    },
    {
      score1: "1",
      player1: "Frozen3",
      VS: "VS",
      score2: "2",
      player2: "Player3",
    },
  ];
}
</script>
