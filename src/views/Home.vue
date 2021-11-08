<template>
  <div class="tool">
    <MainNew />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MainNew from "@/components/MainNew.vue"; // @ is an alias to /src

@Component({
  components: {
    MainNew,
  },
})
export default class Home extends Vue {}
</script>
