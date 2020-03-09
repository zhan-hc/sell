<template>
  <div class="cartcontrol">
      <transition name="move">
      <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count>0">
       <span class="inner icon-remove_circle_outline"></span>
      </div>
      </transition>
      <div class="cart-count"  v-show="food.count">{{food.count}}</div>
      <div class="cart-add icon-add_circle " @click.stop.prevent="addCart">
      </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
export default {
  name: 'cartcontrol',
  data () {
    return {
    }
  },
  methods: {
    addCart () {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1) // 给对象新增属性
        this.food.count = 1
      } else {
        this.food.count++
      }
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  },
  props: ['food']
}
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
.cartcontrol
    font-size 0
    text-align right
    .cart-decrease
        display inline-block
        padding 6px
        transition all 0.4s linear
        &.move-transition
            opacity 1
            transform translate3d(0,0,0)
        .inner
            display inline-block
            line-height 24px
            font-size 24px
            color rgb(0,160,220)
            transition all 0.4s linear
            transform rotate(0)
        &.move-enter,&.move-leave
            opacity 0
            transform translate3d(24px,0,0)
            .inner
                transform rotate(180deg)
    .cart-count
        display inline-block
        vertical-align top
        width 12px
        padding 6px
        line-height 24px
        text-align center
        font-size 10px
        color rgb(147,153,159)
    .cart-add
        display inline-block
        line-height 24px
        padding 6px
        font-size 24px
        color rgb(0,160,220)
</style>
