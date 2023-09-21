<template>
  <div class="py-3 sm:grid sm:grid-cols-3 sm:gap-6 sm:py-6">
    <dt class="font-medium text-gray-400">
      {{ name }}
    </dt>
    <dd class="mt-1 flex text-white sm:col-span-2 sm:mt-0">
      <span class="flex-grow">
        <slot />
      </span>
    </dd>
  </div>
</template>
<script>
  export default {
    props: [
      'name'
    ]
  }
</script>
