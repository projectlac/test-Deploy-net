<template>
  <div class="about">
    <h1>{{ price | filterName }}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  filters: {
    filterName(value: any) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("de-DE");
      return formatter.format(value);
    },
  },
})
export default class ChooseOmyoji extends Vue {
  price: number = 10000;
}
</script>
