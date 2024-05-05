<template>
  <Content height="h-full grid-rows-2">
    <CardText class="col-span-2 row-span-full">
      <Terminal />
    </CardText>
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
