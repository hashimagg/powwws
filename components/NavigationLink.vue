<template>
  <NuxtLink
    to=""
    :id="id"
    @keyup="playAudio('focus', id)"
    @mouseenter="playAudio('hover', id)"
    @mousedown="playAudio('click', id)"
    @mouseup="playAudio('release', id)"
    :class="color + ' inline-flex items-center px-2 -ml-2 text-white focus:outline-none focus:ring-1 ring-white rounded-full'"
    :target="external ? '_blank' : '_self'"
  >
    <slot />
    <IconArrow v-if="external" class="h-3 w-3 ml-2"/>
    <audio :data-id="id + '-focus'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/main-focus.ogg" type="audio/ogg" />
    </audio>
    <audio :data-id="id + '-hover'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/navigation-hover.ogg" type="audio/ogg" />
    </audio>
    <audio :data-id="id + '-click'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/main-click.ogg" type="audio/ogg" />
    </audio>
    <audio :data-id="id + '-release'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/main-release.ogg" type="audio/ogg" />
    </audio>
  </NuxtLink>
</template>
<script>
  export default {
    props: [
      'color',
      'external',
      'id'
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
