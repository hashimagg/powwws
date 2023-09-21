<template>
  <span :class="color + ' inline-flex rounded-full px-2 text-black text-xs uppercase'">
    <slot />
  </span>
</template>
<script>
  export default {
    props: [
      'color'
    ]
  }
</script>
