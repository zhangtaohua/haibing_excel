<template>
  <div class="row_nw_fs_center wh_100vw_100vh">
    <img v-if="imageUrl" class="day_img_show" :src="imageUrl" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import bgimg from "@/assets/images/common/bg.jpg";

import { getDataByUrl } from "@/api/data.ts";

const imageUrl = ref(bgimg);

getDataByUrl("/daily")
  .then((res) => {
    if (res && res.images && res.images.length) {
      const temp = res.images[0];
      imageUrl.value = "https://www.bing.com/" + temp.url;
    }
  })
  .catch((err) => {
    imageUrl.value = bgimg;
  });
</script>

<style scoped lang="scss">
.day_img_show {
  width: 100vw;
  height: 100vh;
}
</style>
