<script setup lang="ts">
  const route = useRoute()
</script>
<template>
  <App id="main">
    <NuxtLoadingIndicator color="#14b8a6" />
    <NuxtPage />
    <Header />
    <Virus />
    <Japan />
  </App>
</template>
