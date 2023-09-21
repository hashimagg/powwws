<template>
  <nav class="col-span-2 pattern uppercase" aria-label="Breadcrumb">
    <ol role="list" class="flex w-full justify-between">
      <li class="flex pattern px-6 py-1 mx-6 md:mx-12 my-4 rounded-lg">
        <div class="flex items-center">
          <span class="text-white" aria-current="page">
            {{ title }}
          </span>
        </div>
      </li>
      <li class="flex border-r border-gray-900 rounded-b-lg">
        <div class="flex items-center">
          <NuxtLink
            to="/"
            :id="id"
            @keyup="playAudio('focus', id)"
            @mouseenter="playAudio('hover', id)"
            @mousedown="playAudio('click', id)"
            @mouseup="playAudio('release', id)"
            :class="color + ' px-6 md:px-12 py-6 text-white focus-within:ring-2 focus-within:ring-inset focus-within:ring-white rounded-tr-lg pointer-events-auto'">
            <svg class="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 448 512">
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
            </svg>
            <span class="sr-only">
              Home
            </span>
            <audio :data-id="id + '-focus'" controls class="invisible absolute w-0 h-0">
              <source src="/main-focus.ogg" type="audio/ogg" />
            </audio>
            <audio :data-id="id + '-hover'" controls class="invisible absolute w-0 h-0">
              <source src="/main-hover.ogg" type="audio/ogg" />
            </audio>
            <audio :data-id="id + '-click'" controls class="invisible absolute w-0 h-0">
              <source src="/main-click.ogg" type="audio/ogg" />
            </audio>
            <audio :data-id="id + '-release'" controls class="invisible absolute w-0 h-0">
              <source src="/back-release.ogg" type="audio/ogg" />
            </audio>
          </NuxtLink>
        </div>
      </li>
    </ol>
  </nav>
</template>
<script>
  export default {
    props: [
      'color',
      'id',
      'title'
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
