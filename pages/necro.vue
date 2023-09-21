<template>
  <Content>
    <Bar
      id="back"
      title="リサーチ / NECRO"
      color="hover:text-teal-500"
    />
    <CardImage class="col-span-2">
      <img src="~assets/images/necro.gif" width="2560" height="1440" alt="POWWWS Laboratory — NECRO"/>
    </CardImage>
    <CardText class="col-span-2">
      <HeadingSans>
        リサーチ
      </HeadingSans><br />
      <HeadingSerif class="text-5xl flex">
        NECRO
        <div class="ml-2 mt-1 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
          <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 398.9c58.5-41.1 96-104.1 96-174.9C512 100.3 397.4 0 256 0S0 100.3 0 224c0 70.7 37.5 133.8 96 174.9c0 .4 0 .7 0 1.1v64c0 26.5 21.5 48 48 48h48V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h64V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h48c26.5 0 48-21.5 48-48V400c0-.4 0-.7 0-1.1zM96 256a64 64 0 1 1 128 0A64 64 0 1 1 96 256zm256-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
          </svg>
        </div>
      </HeadingSerif>
    </CardText>
    <CardDetail class="col-span-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 py-6 gap-12">
        <div class="space-y-4">
          <span class="block text-white">POWWWS研究所では、NECRO研究チームが壊死と組織の複雑な世界に深く入り込んでいます。私たちは組織壊死の複雑なメカニズムと人間の健康への影響を調査しています。最先端の画像技術を用いて、壊死に関与する細胞および分子プロセスを探求し、組織死を引き起こす要因とそれに続く炎症反応を解明することを目指しています。</span>
        </div>
        <div class="space-y-4">
          <span class="block text-white">また、壊死による組織損傷を軽減するための潜在的な治療標的の特定にも注力し、虚血性損傷や炎症性疾患を含むさまざまな状態に対する革新的な治療戦略を開発することを目指しています。</span>
        </div>
      </div>
    </CardDetail>
    <Address />
  </Content>
</template>
<script>
  export default {
    mounted() {
      this.$nextTick(() => {
      })
    },
    beforeRouteLeave(to, from, next) {
      setTimeout(function() {
        next()
      }, 173)
    }
  }
</script>

