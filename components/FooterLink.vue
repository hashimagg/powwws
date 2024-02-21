<template>
  <NuxtLink
    :to="url"
    :id="id"
    @keyup="playAudio('focus', id)"
    @mouseenter="playAudio('hover', id)"
    @mousedown="playAudio('click', id)"
    @mouseup="playAudio('release', id)"
    :class="color + ' w-7 h-7 flex items-center justify-center focus:outline-none focus:ring-1 ring-white text-white rounded-full'"
    target="_blank"
  >
    <span class="sr-only">
      {{ label }}
    </span>
    <slot />
    <audio :data-id="id + '-focus'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/main-focus.ogg" type="audio/ogg" />
    </audio>
    <audio :data-id="id + '-hover'" controls class="invisible absolute w-0 h-0" tabindex="-1">
      <source src="/footer-hover.ogg" type="audio/ogg" />
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
      'id',
      'label',
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
