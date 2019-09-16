<template>
  <div class="about">
<!--    <van-action-sheet-->
<!--      v-model="show"-->
<!--      :actions="actions"-->
<!--      @select="onSelect"-->
<!--    >sada</van-action-sheet>-->
    sdafadfsd
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'Index',
  data () {
    return {
      show: true,
      actions: [
        { name: '选项' },
        { name: '选项' },
        { name: '选项', subname: '描述信息' }
      ]
    }
  },
  methods: {
    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false
      Toast(item.name)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .test
    width 100%
    height 10rem
    background-color #25a4bb
</style>
