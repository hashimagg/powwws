<template>
  <Content>
    <Bar
      id="back"
      title="会社 / POWWWS"
      color="hover:text-teal-500"
    />
    <CardImage class="col-span-2">
      <img src="~assets/images/about-1.gif" class="pixelated" width="2560" height="1440" alt="POWWWS Laboratory" />
    </CardImage>
    <CardText class="col-span-2">
      <HeadingSans>
        会社
      </HeadingSans><br />
      <HeadingSerif class="text-5xl">
        POWWWS
      </HeadingSerif>
    </CardText>
    <CardDetail class="col-span-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 py-6 gap-12">
        <div class="space-y-4">
          <span class="block text-white">POWWWS Laboratoryは、潜在的な感染症の蔓延シナリオにおけるウイルス感染症、ゾンビ病理学、および肉体感染症の研究に特化した、世界クラスの研究施設です。情熱的な科学者や研究者たちが、これらの病理学の複雑性を解明し、その社会への影響を軽減するための効果的な治療法や予防策を開発することに取り組んでいます。</span>
        </div>
        <div class="space-y-4">
          <span class="block text-white">私たちの研究アプローチは包括的であり、分子ウイルス学、遺伝学、コンピューターモデリング、構造生物学などの最新の科学的手法を統合しています。この多様なアプローチにより、新しいウイルス感染症やゾンビ病原体を迅速に検出・特定し、それらの蔓延や影響の根源にある分子および細胞機構を探求することを目指しています。</span>
        </div>
      </div>
    </CardDetail>
    <CardDetail class="col-span-2">
      <div class="grid grid-cols-1 sm:grid-cols-3 py-6 gap-12">
        <div class="space-y-4">
          <img src="/images/team-1.gif" class="pixelated rounded-lg" width="500" height="500" alt="Hiroshi Tanaka (田中 宏)" />
          <div>
            <span class="block text-white">Hiroshi Tanaka (田中 宏)</span>
            <span class="block text-gray-400 text-sm">CEO兼創設者</span>
          </div>
        </div>
        <div class="space-y-4">
          <img src="/images/team-2.gif" class="pixelated rounded-lg" width="500" height="500" alt="Aya Yamamoto (山本 彩)" />
          <div>
            <span class="block text-white">Aya Yamamoto (山本 彩)</span>
            <span class="block text-gray-400 text-sm">PEST エンジニアリング副社長</span>
          </div>
        </div>
        <div class="space-y-4">
          <img src="/images/team-3.gif" class="pixelated rounded-lg" width="500" height="500" alt="Kazuki Suzuki (鈴木 一樹)" />
          <div>
            <span class="block text-white">Kazuki Suzuki (鈴木 一樹)</span>
            <span class="block text-gray-400 text-sm">BIOS オペレーション担当副社長</span>
          </div>
        </div>
        <div class="space-y-4">
          <img src="/images/team-4.gif" class="pixelated rounded-lg" width="500" height="500" alt="Sakura Kobayashi (小林 さくら)" />
          <div>
            <span class="block text-white">Sakura Kobayashi (小林 さくら)</span>
            <span class="block text-gray-400 text-sm">NECRO開発担当副社長</span>
          </div>
        </div>
        <div class="space-y-4">
          <img src="/images/team-5.gif" class="pixelated rounded-lg" width="500" height="500" alt="Haruka Sato (佐藤 遥)" />
          <div>
            <span class="block text-white">Haruka Sato (佐藤 遥)</span>
            <span class="block text-gray-400 text-sm">研究所・研究部門ディレクター</span>
          </div>
        </div>
        <div class="space-y-4">
          <img src="/images/team-6.gif" class="pixelated rounded-lg" width="500" height="500" alt="Yuki Nakamura (中村 勇気)" />
          <div>
            <span class="block text-white">Yuki Nakamura (中村 勇気)</span>
            <span class="block text-gray-400 text-sm">最高執行責任者</span>
          </div>
        </div>
      </div>
    </CardDetail>
    <CardImage class="col-span-2">
      <img src="~assets/images/about-2.gif" class="pixelated" width="2560" height="1440" alt="POWWWS Laboratory Diag" />
    </CardImage>
    <CardDetail class="col-span-2">
      <div class="grid grid-cols-1 sm:grid-cols-2 py-6 gap-12">
        <div class="space-y-4">
          <span class="block text-white">POWWWSでは、ウイルス感染症やゾンビ病理学の研究が、単に病原体の分子的・遺伝子的解析に留まらないことを認識しています。私たちのチームは、肉体感染症の生理学的・病理学的特徴を理解することにも専念しています。この包括的なアプローチにより、これらの壊滅的な病気の根本原因に対処する革新的な治療介入を開発することを目指しています。</span>
        </div>
        <div class="space-y-4">
          <span class="block text-white">私たちの研究室は、データ分析と人工知能の最先端をもってして、精度と正確性をもって複雑な病理学を観察し理解することができることを誇りにしています。私たちの研究を通じて、社会全体に知識や洞察を広め、潜在的な流行に対応するためのコミュニティ準備を支援することを目指しています。</span>
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
