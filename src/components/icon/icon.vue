<template>
  <div class="icon" :class="classMap[item.type]+'_'+size" :style="{'width':wh,'height': wh,'margin-right':mr}">
      <!-- <span :class="classMap[item.type]+'_'+size"></span> -->
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'icon',
  data () {
    return {
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  props: ['size', 'item', 'wh', 'mr']
}
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
@import "../../common/stylus/mixin"

.icon
  // width 12px
  // height 12px
  vertical-align top
  display inline-block
  background-size 12px 12px
  background-repeat no-repeat
  &.decrease_1
    bg-image('decrease_1')
  &.discount_1
    bg-image('discount_1')
  &.guarantee_1
    bg-image('guarantee_1')
  &.invoice_1
    bg-image('invoice_1')
  &.special_1
    bg-image('special_1')
    //
  &.decrease_2
    bg-image('decrease_2')
  &.discount_2
    bg-image('discount_2')
  &.guarantee_2
    bg-image('guarantee_2')
  &.invoice_2
    bg-image('invoice_2')
  &.special_2
    bg-image('special_2')
    //
  &.decrease_3
    bg-image('decrease_3')
  &.discount_3
    bg-image('discount_3')
  &.guarantee_3
    bg-image('guarantee_3')
  &.invoice_3
    bg-image('invoice_3')
  &.special_3
    bg-image('special_3')
    //
  &.decrease_4
    bg-image('decrease_4')
  &.discount_4
    bg-image('discount_4')
  &.guarantee_4
    bg-image('guarantee_4')
  &.invoice_4
    bg-image('invoice_4')
  &.special_4
    bg-image('special_4')
</style>
