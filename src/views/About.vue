<template>
  <div class="about">
    <v-file-input label="File input" @change="handle"></v-file-input>
    <v-btn @click="submit()"> Submit </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class ChooseOmyoji extends Vue {
  file: any = null;
  handle(e: any) {
    console.log(e);
    this.file = e;
  }
  submit() {
    console.log(this.file);
  }
}
</script>
