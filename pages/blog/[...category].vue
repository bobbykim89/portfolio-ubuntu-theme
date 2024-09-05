<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div>
    {{ route.params.category }}
  </div>
</template>

<style scoped></style>
