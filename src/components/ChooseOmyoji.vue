<template>
  <div class="Onmyoji px-4 py-2">
    <v-row class="OnmyojiRow ma-0">
      <v-col
        cols="3"
        class="OnmyojiCard px-2"
        :class="{ pickOnmy: o.pickAction }"
        v-for="o in data"
        :key="o.id"
      >
        <div class="borderOnmyoji" @click="chooseOnmy(o.id)">
          <img :src="'./img/' + o.img" alt="" />
          <p>{{ o.name }}</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
type Onmy = {
  id: number;
  name: string;
  pickAction: boolean;
  img: string;
};
@Component({})
export default class ChooseOmyoji extends Vue {
  @Prop() data!: Array<Onmy>;
  chooseOnmy(val: number) {
    this.$emit("chooseOnmy", val);
  }
}
</script>
