export default defineNuxtConfig({
  app: {
    head: {
      title: 'POWWWS Laboratory',
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, height=device-height, user-scalable=no, initial-scale=1'
        },
        {
          name: 'format-detection', content: 'telephone=no'
        },
        {
          hid: 'description',
          name: 'description',
          content: '潜在的な感染症の蔓延シナリオにおけるウイルス感染症、ゾンビ病理学、および肉体感染症の研究に特化した、世界クラスの研究施設です。'
        },
        {
          hid: 'og:type', property: 'og:type', content: 'website'
        },
        {
          hid: 'og:title', property: 'og:title', content: 'POWWWS Laboratory'
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: '潜在的な感染症の蔓延シナリオにおけるウイルス感染症、ゾンビ病理学、および肉体感染症の研究に特化した、世界クラスの研究施設です。'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://poww.ws/share.png'
        },
        {
          hid: 'og:url', property: 'og:url', content: 'https://poww.ws'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          hid: 'twitter:title', name: 'twitter:title', content: 'POWWWS Laboratory'
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: '潜在的な感染症の蔓延シナリオにおけるウイルス感染症、ゾンビ病理学、および肉体感染症の研究に特化した、世界クラスの研究施設です。'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://poww.ws/share.png'
        },
      ],
      script: [
        { src: '/three.js'},
        { src: '/orbitcontrols.js'}
      ],
      link: [
        { rel: 'icon', href: '/favicon.svg' }
      ],
      style: [
      ],
      noscript: [
        { children: 'Javascript is required' }
      ],
      bodyAttrs: {
        class: 'bg-black font-sans select-none'
      }
    }
  },
  css: [
    '~/assets/css/application.scss'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
