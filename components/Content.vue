<template>
  <div class="m-6 mb-0 md:m-12 md:mb-0 xl:mb-12 xl:mr-0 flex-1 max-w-7xl lg:pointer-events-none z-10">
    <div :class="'divide-y divide-gray-700 overflow-hidden rounded-lg sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 auto-rows-min border border-gray-900 ' + height">
      <slot />
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'height'
    ]
  }
</script>
