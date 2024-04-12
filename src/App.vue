<template>
  <div class="wh_100vw_100vh app_container">
    <DailyImage />
    <HeaderDrawn />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import HeaderDrawn from "@/components/header/HeaderDrawn.vue";
import DailyImage from "@/components/common/DailyImage.vue";
</script>

<style scoped>
.app_container {
  margin: 0;
  padding: 0;
  overflow: scroll;
  scroll-behavior: smooth;
}

.app_container::-webkit-scrollbar {
  display: none;
  width: 0;
}
</style>
