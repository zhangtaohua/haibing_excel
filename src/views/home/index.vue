<template>
  <div class="home_container">主页</div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home_container {
  position: fixed;
  top: 3rem;
  left: 0;
  z-index: 10;
  width: 27.5rem;
  height: calc(100vh - 3rem);
  background: var(--c-255-255-255-100);
  display: none;
}
</style>
