<template>
  <div>
    hello
    <img :src="img" alt="">
  </div>
</template>

<script>
import img from '../assets/img.jpg'
export default {
  data() {
    return {
      img
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>