<template>
  <div class="about">
    <v-file-input label="File input" @change="handle"></v-file-input>
    <v-btn @click="submit()"> Submit </v-btn>
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
      <!-- show logout when authenticated -->
      <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component({})
export default class ChooseOmyoji extends Vue {
  login() {
    this.$auth.loginWithRedirect({});
  }

  // Log the user out
  logout() {
    this.$auth.logout({
      returnTo: window.location.origin,
    });
  }
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
