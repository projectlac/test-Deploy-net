<template>
  <div class="about">
    <v-file-input label="File input" @change="handle"></v-file-input>
    <v-btn @click="submit()"> Submit </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component({})
export default class ChooseOmyoji extends Vue {
  file: any = null;
  handle(e: any) {
    this.file = e;
  }
  submit() {
    const formData = new FormData();
    formData.append("file", this.file);
    formData.append("upload_preset", "nkxb0rzk");
    axios
      .post(
        `https://api.cloudinary.com/v1_1/onmyojiimage/image/upload`,
        formData
      )
      .then((response) => {
        console.log(response.data.url);
      });
  }
}
</script>
