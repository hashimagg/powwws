<template>
  <div class="relative group pattern p-6 md:p-12 focus-within:ring-2 focus-within:ring-inset focus-within:ring-white">
    <span class="rounded-lg flex text-white overflow-hidden">
      <slot />
    </span>
    <div class="mt-6">
      <HeadingSans>
        {{ label }}
      </HeadingSans>
      <NuxtLink
        :to="url"
        :id="id"
        @keyup="playAudio('focus', id)"
        @mouseenter="playAudio('hover', id)"
        @mousedown="playAudio('click', id)"
        @mouseup="playAudio('release', id)"
        class="flex flex-col focus:outline-none"
        :target="external ? '_blank' : '_self'"
      >
        <span class="absolute inset-0" aria-hidden="true" />
        <HeadingSerif :class="color + ' text-4xl'">
          {{ title }}
        </HeadingSerif>
      </NuxtLink>
      <p class="mt-3 text-gray-400 uppercase">
        {{ description }}
      </p>
    </div>
    <audio :data-id="id + '-focus'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/main-focus.ogg" type="audio/ogg" />
    </audio>
    <audio :data-id="id + '-hover'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/main-hover.ogg" type="audio/ogg" />
    </audio>
    <audio :data-id="id + '-click'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/main-click.ogg" type="audio/ogg" />
    </audio>
    <audio :data-id="id + '-release'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/main-release.ogg" type="audio/ogg" />
    </audio>
    <span v-if="external" class="lg:pointer-events-none absolute top-6 right-6 text-gray-400 group-hover:text-white" aria-hidden="true">
      <IconArrow class="h-6 w-6"/>
    </span>
  </div>
</template>
<script>
  export default {
    props: [
      'color',
      'description',
      'external',
      'id',
      'label',
      'title',
      'url'
    ],
    methods: {
      playAudio(action, id) {
        const audio = document.querySelector(`[data-id="${id}-${action}"]`)

        if (audio) {
          audio.pause()
          audio.currentTime = 0
          audio.play()
        }
      }
    }
  }
</script>
