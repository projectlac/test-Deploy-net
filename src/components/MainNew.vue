<template>
  <v-container class="allContent">
    <!-- <HeaderBar :countClick="countClick" /> -->
    <!-- <v-overlay opacity="0.8" :value="warning">
      <v-alert
        color="deep-orange"
        type="error"
        class="warning_alert"
        border="left"
        width="700px"
      >
        <h3 class="text-h5">Thông báo</h3>
        <div>
          Việc không chọn Shikigami mà khóa lựa chọn đồng nghĩa với việc bỏ lượt
          chọn này.
        </div>

        <v-divider class="my-4 info" style="opacity: 0.22"></v-divider>

        <v-row align="center" no-gutters>
          <v-col class="grow" cols="7">
            Bạn có chắc chắn với lựa chọn của mình?
            <v-checkbox
              v-model="ex4"
              label="Không nhắc tôi ở lượt đấu này"
              color="indigo"
              hide-details
            ></v-checkbox>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="shrink mr-3">
            <v-btn color="info" @click="handleYes()"> Đồng ý </v-btn>
          </v-col>
          <v-col class="shrink">
            <v-btn color="green" @click="handleNo()"> Quay lại </v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-overlay> -->
    <v-row>
      <Blue :banBlue="banBlue" :pickBlue="pickBlue" :blueOnmy="blueOnmy" />
      <Effect :hiddenMiddle="{ doneBanpick: countClick == 16 }" />
      <v-overlay :value="overlay">
        <p id="countDown">
          <span>
            <p>
              {{ textManager }}
            </p>
          </span>
        </p>
      </v-overlay>
      <div class="mainContent" :class="{ doneBanpick: countClick == 16 }">
        <div class="choose-shiki" v-if="countClick < 14">
          <v-row class="justify-center mt-xl-4 mt-lg-0">
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
          <div class="wrapper pa-3" v-if="countClick < 4">
            <v-row>
              <v-col
                cols="2"
                class="card"
                v-for="post in filteredBanList"
                :key="post.id"
              >
                <div
                  class="border"
                  :class="{ hadChoose: post.disable, pick: post.pickAction }"
                  @click="pick(post.id)"
                >
                  <img :src="'./img/' + post.img" alt="" />
                </div>
                <p>{{ post.name }}</p>
              </v-col>
            </v-row>
          </div>
          <div
            class="wrapper pa-3"
            v-if="countClick >= 4 && countClick % 2 == 0"
          >
            <v-row>
              <v-col
                cols="2"
                class="card"
                v-for="post in filteredBanList"
                :key="post.id"
              >
                <div
                  class="border"
                  :class="{
                    hadChoose: post.disable,

                    pick: post.pickAction,
                  }"
                  @click="pick(post.id)"
                >
                  <img :src="'./img/' + post.img" alt="" />
                </div>
                <p>{{ post.name }}</p>
              </v-col>
            </v-row>
          </div>
          <div
            class="wrapper pa-3"
            v-if="countClick >= 4 && countClick % 2 == 1"
          >
            <v-row>
              <v-col
                cols="2"
                class="card"
                v-for="post in filteredBanList"
                :key="post.id"
              >
                <div
                  class="border"
                  :class="{
                    hadChoose: post.disable,

                    pick: post.pickAction,
                  }"
                  @click="pick(post.id)"
                >
                  <img :src="'./img/' + post.img" alt="" />
                </div>
                <p>{{ post.name }}</p>
              </v-col>
            </v-row>
          </div>
        </div>

        <ChooseOmyoji v-else @chooseOnmy="chooseOnmy" :data="onmyoji" />
      </div>
      <div class="lol">
        <v-btn
          class="lock text-nomal pt-1"
          :disabled="disableButtonWhenNotSelectedYet"
          :class="{ doneBanpick: countClick == 16 }"
          @click="lock()"
        >
          {{ lockText }}
        </v-btn>
      </div>
      <Red :banRed="banRed" :pickRed="pickRed" :redOnmy="redOnmy" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Blue from "@/components/Blue.vue";
import Red from "@/components/Red.vue";
import Effect from "@/components/Effect.vue";

import ChooseOmyoji from "@/components/ChooseOmyoji.vue";
import { SSR } from "@/store/data";

type Data = {
  name: string;
  image: string;
  id: number;
};
type Onmy = {
  id: number;
  name: string;
  pickAction: boolean;
  img: string;
};
@Component({
  components: {
    Blue,
    Red,
    ChooseOmyoji,
    Effect,
  },
})
export default class Main extends Vue {
  disableButtonWhenNotSelectedYet: boolean = true;
  banList = SSR;
  keyword: string = "";
  countClick: number = 0;
  overlay: boolean = false;
  textManager: string = "";
  banBlue: Array<object> = [{}, {}];
  banRed: Array<object> = [{}, {}];
  pickBlue: Array<object> = [{}, {}, {}, {}, {}];
  pickRed: Array<object> = [{}, {}, {}, {}, {}];
  blueOnmy: any = {};
  redOnmy: any = {};
  icon: string = "";
  toogleTurn: boolean = true;
  lockText: string = "Cấm";
  item: Data = {
    name: "",
    image: "",
    id: -1,
  };
  default: Data = {
    name: "",
    image: "",
    id: -1,
  };

  onmyoji: Array<Onmy> = [
    { id: 0, name: "Seimei", pickAction: false, img: "O1skin1.png" },
    { id: 1, name: "Kagura", pickAction: false, img: "O2skin1.png" },
    { id: 2, name: "Hiromasa", pickAction: false, img: "O3skin1.png" },
    { id: 3, name: "Yao bikuni", pickAction: false, img: "O4skin1.png" },
  ];

  countBanBlue: number = 0;
  countBanRed: number = 0;
  countPickBlue: number = 0;
  countPickRed: number = 0;

  pick(val: number) {
    this.banList.map((b) => {
      b.pickAction = false;
    });

    this.banList[val].pickAction = true;

    this.item.name = this.banList[val].name;
    this.item.image = this.banList[val].img;
    this.item.id = this.banList[val].id;
    this.disableButtonWhenNotSelectedYet = false;
  }

  lock() {
    const shiki = this.item;
    if (this.banList[shiki.id].pickAction && this.countClick < 4) {
      if (this.countClick % 2 == 0) {
        this.banBlue.splice(this.countBanBlue, 1, this.banList[shiki.id]);
        this.countBanBlue++;
      } else {
        this.banRed.splice(this.countBanRed, 1, this.banList[shiki.id]);
        this.countBanRed++;
      }
      this.banList[shiki.id].pickAction = false;
      this.banList[shiki.id].disable = true;
      if (this.countClick == 3) {
        this.lockText = "Chọn";
      }
    }
    if (
      this.banList[shiki.id].pickAction &&
      this.countClick >= 4 &&
      this.countClick < 14
    ) {
      if (this.countClick % 2 == 0) {
        // this.pickBlue.push(this.banList[shiki.id]);
        this.pickBlue.splice(this.countPickBlue, 1, this.banList[shiki.id]);
        this.banList[shiki.id].pickAction = false;
        this.banList[shiki.id].bluePick = true;
        this.countPickBlue++;
      } else {
        // this.pickRed.push(this.banList[shiki.id]);
        this.pickRed.splice(this.countPickRed, 1, this.banList[shiki.id]);
        this.banList[shiki.id].pickAction = false;
        this.banList[shiki.id].redPick = true;
        this.countPickRed++;
      }
    }
    if (this.countClick >= 14) {
      if (this.countClick % 2 == 0) {
        this.blueOnmy = this.onmyoji[shiki.id];
      } else {
        this.redOnmy = this.onmyoji[shiki.id];
      }
    }

    this.overlay = true;
    this.textManagement();
    this.resetItem();
    setTimeout(() => {
      this.countClick++;
    }, 1000);
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
  resetItem() {
    this.item = this.default;
    this.disableButtonWhenNotSelectedYet = true;
  }
  resetKeyword() {
    this.keyword = "";
  }

  chooseOnmy(val: number) {
    this.onmyoji.map((b) => {
      b.pickAction = false;
    });
    this.onmyoji[val].pickAction = true;
    this.item.id = val;
    this.disableButtonWhenNotSelectedYet = false;
  }
  @Watch("keyword")
  wKey() {
    if (this.keyword != "") {
      this.icon = "mdi-close";
    } else {
      this.icon = "";
    }
  }
  get filteredBanList() {
    return this.banList.filter((post: any) => {
      return post.name.toLowerCase().includes(this.keyword.toLowerCase());
    });
  }
}
</script>
