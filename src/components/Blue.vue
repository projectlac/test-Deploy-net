<template>
  <div class="Blue pl-3 pr-4">
    <v-row>
      <div class="banBlue">
        <div class="borderBan" v-for="(b, index) in banBlue" :key="index">
          <div class="borderBanImg"></div>
          <img :src="'./img/' + b.img" alt="" />
        </div>
      </div>
      <div class="pickBlue">
        <div class="borderPickBlue" v-for="(p, index) in pickBlue" :key="index">
          <div class="borderPickImg"></div>
          <img :src="'./img/' + p.img" alt="" />
        </div>
      </div>
      <div class="OmyBlue" v-if="blueOnmy.name">
        <img :src="'./img/' + blueOnmy.img" alt="" />
      </div>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Blue extends Vue {
  @Prop() banBlue!: Array<any>;
  @Prop() pickBlue!: Array<any>;
  @Prop() blueOnmy!: any;
  countBan: number = 0;

  @Watch("banBlue", { immediate: true, deep: true })
  onPersonChanged1(val: any) {
    console.log(val);
  }
}
</script>
