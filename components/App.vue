<template>
  <div
    :id="id"
    @mousedown="playAudio('ambient', id)"
    class="flex flex-col xl:flex-row min-h-screen bg-slate-900 max-w-14xl border-r border-gray-900"
  >
    <slot />
    <audio :data-id="id + '-ambient'" controls class="invisible absolute w-0 h-0" loop>
      <source src="/main-ambient.ogg" type="audio/ogg" />
    </audio>
  </div>
</template>
<script>
  export default {
    props: [
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
