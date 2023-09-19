<script setup lang="ts">
import Header from "./components/Header.vue";

import { useRoute } from "vue-router";
import { watch } from "vue";
const route = useRoute();

watch(
  () => route.path,
  () => {
    document.title = route.meta.title as string;
  }
);

</script>

<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<style scoped></style>
