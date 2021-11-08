<template>
  <v-container class="allContent">
    <!-- <HeaderBar :countClick="countClick" /> -->
    <v-row>
      <Blue :banBlue="banBlue" :pickBlue="pickBlue" :blueOnmy="blueOnmy" />
      <Effect />
      <div class="mainContent" :class="{ doneBanpick: countClick == 16 }">
        <v-overlay :value="overlay">
          <p id="countDown">
            <span>
              <p>
                {{ textManager }}
              </p>
            </span>
          </p>
        </v-overlay>

        <div class="choose-shiki" v-if="countClick < 14">
          <v-row class="justify-center mt-4">
            <v-col cols="6">
              <div class="search-wrapper">
                <v-text-field
                  v-model="keyword"
                  label="Tìm kiếm"
                  outlined
                  hide-details="auto"
                  solo
                  color="#e0d1a9"
                  dense
                  @click:append="resetKeyword"
                  :append-icon="icon"
                  class="mt-2 px-3"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
          <div class="wrapper pa-4 pl-2" v-if="countClick < 4">
            <v-row>
              <v-col
                cols="2"
                class="card px-2"
                v-for="post in filteredBanList"
                :key="post.id"
              >
                <div
                  class="border"
                  :class="{ hadChoose: post.disable }"
                  @click="ban(post.id)"
                >
                  <img :src="'./img/' + post.img" alt="" />
                </div>
                <p>{{ post.name }}</p>
              </v-col>
            </v-row>
          </div>
          <div
            class="wrapper pa-4 pl-2"
            v-if="countClick >= 4 && countClick % 2 == 0"
          >
            <v-row>
              <v-col
                cols="2"
                class="card px-2"
                v-for="post in filteredBanList"
                :key="post.id"
              >
                <div
                  class="border"
                  :class="{
                    hadChoose: post.disable,
                    blueChoose: post.bluePick,
                  }"
                  @click="choose(countClick, post.id)"
                >
                  <img :src="'./img/' + post.img" alt="" />
                </div>
                <p>{{ post.name }}</p>
              </v-col>
            </v-row>
          </div>
          <div
            class="wrapper pa-4 pl-2"
            v-if="countClick >= 4 && countClick % 2 == 1"
          >
            <v-row>
              <v-col
                cols="2"
                class="card px-2"
                v-for="post in filteredBanList"
                :key="post.id"
              >
                <div
                  class="border"
                  :class="{ hadChoose: post.disable, redChoose: post.redPick }"
                  @click="choose(countClick, post.id)"
                >
                  <img :src="'./img/' + post.img" alt="" />
                </div>
                <p>{{ post.name }}</p>
              </v-col>
            </v-row>
          </div>
        </div>

        <ChooseOmyoji v-else @chooseOnmy="chooseOnmy" />
      </div>
      <button class="lock">Khóa</button>
      <Red :banRed="banRed" :pickRed="pickRed" :redOnmy="redOnmy" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Blue from "@/components/Blue.vue";
import Red from "@/components/Red.vue";
import Effect from "@/components/Effect.vue";
// import HeaderBar from "@/components/HeaderBar.vue";
import ChooseOmyoji from "@/components/ChooseOmyoji.vue";
import { SSR } from "@/store/data";

@Component({
  components: {
    Blue,
    Red,
    ChooseOmyoji,
    Effect,
    // HeaderBar,
  },
})
export default class Main extends Vue {
  keyword: string = "";
  banList = SSR;
  icon: string = "";
  countClick: number = 0;
  banBlue: Array<object> = [];
  banRed: Array<object> = [];
  pickBlue: Array<object> = [];
  pickRed: Array<object> = [];
  blueOnmy: any = {};
  redOnmy: any = {};
  overlay: boolean = false;
  hiddenAllBox: boolean = false;

  hiddencountDown: boolean = true;
  toogleTurn: boolean = true;
  textManager: string = "";

  get filteredBanList() {
    return this.banList.filter((post: any) => {
      return post.name.toLowerCase().includes(this.keyword.toLowerCase());
    });
  }

  @Watch("keyword")
  wKey() {
    if (this.keyword != "") {
      this.icon = "mdi-close";
    } else {
      this.icon = "";
    }
  }

  textManagement() {
    this.toogleTurn = !this.toogleTurn;

    if (this.toogleTurn) {
      if (this.countClick == 15) {
        this.textManager = "Hoàn tất";
      } else this.textManager = "Lượt Xanh";
    } else {
      this.textManager = "Lượt Đỏ";
    }

    setTimeout(() => {
      this.overlay = false;
    }, 1000);
  }

  resetKeyword() {
    this.keyword = "";
  }
  ban(val: number) {
    if (!this.banList[val].disable) {
      if (this.countClick < 4) {
        this.banList[val].disable = true;
        if (this.countClick % 2 == 0) {
          this.banBlue.push(this.banList[val]);
        } else {
          this.banRed.push(this.banList[val]);
        }
      }
      this.countClick++;
    }
  }

  choose(x: number, y: number) {
    if (x < 14) {
      if (x % 2 == 0) {
        this.pickBlue.push(this.banList[y]);
        this.banList[y].bluePick = true;
      } else {
        this.pickRed.push(this.banList[y]);
        this.banList[y].redPick = true;
      }
    }
    this.overlay = true;
    this.textManagement();

    setTimeout(() => {
      this.countClick++;
    }, 1000);
  }
  chooseOnmy(val: any) {
    if (this.countClick % 2 == 0) {
      this.blueOnmy = val;
      this.textManagement();
      this.overlay = true;
    } else {
      this.redOnmy = val;
      this.textManagement();
      this.overlay = true;
    }
    setTimeout(() => {
      this.countClick++;
      this.overlay = false;
    }, 1000);
  }
}
</script>
