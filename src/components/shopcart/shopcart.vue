<template>
  <div>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>
        <div class="shopcart-list" v-show="listShow()">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price * food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="list-mask" @click="hideList" v-show="listShow()">

    </div>
  </div>
</template>

<script type="text/javascript">
import cartcontrol from '../cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  name: 'shopcart',
  data () {
    return {
      fold: true // 折叠状态
    }
  },
  methods: {
    toggleList () { // 点击购物车的开关
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    listShow () { // 是否显示购物车详情
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
    },
    hideList () {
      this.fold = true
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert('需要支付' + this.totalPrice + '元')
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return '￥' + this.minPrice + '元起送'
      } else if (this.totalPrice < this.minPrice) {
        return '还差' + (this.minPrice - this.totalPrice) + '元起送'
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  },
  components: {
    cartcontrol
  },
  props: ['deliveryPrice', 'minPrice', 'selectFoods']
}
</script>
<style lang="stylus" scoped ref="stylesheet/stylus">
@import "../../common/stylus/mixin"
.shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
        display flex
        background #141d27
        font-size 0
        color rgba(255,255,255,0.4)
        .content-left
            flex 1
            .logo-wrapper
                display inline-block
                position relative
                vertical-align top
                top -10px
                margin 0 12px
                padding 6px
                width 56px
                height 56px
                box-sizing border-box
                border-radius 50%
                background #141d27
                .logo
                    width 100%
                    height 100%
                    border-radius 50%
                    background #2b343c
                    text-align center
                    &.highlight
                        background rgb(0,160,220)
                    .icon-shopping_cart
                        line-height 44px
                        font-size 20px
                        color #80858a
                        &.highlight
                            color #fff
                .num
                    position relative
                    bottom 48px
                    left 23px
                    width 24px
                    height 16px
                    line-height 16px
                    text-align center
                    border-radius 16px
                    font-size 9px
                    font-weight 700
                    color #ffffff
                    background rgb(240,20,20)
                    box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
            .price
                display inline-block
                vertical-align top
                line-height 24px
                margin-top 12px
                padding-right 12px
                border-right 1px solid rgba(255,255,255,0.1)
                box-sizing border-box
                font-size 16px
                font-weight 700
                &.highlight
                    color #fff
            .desc
                display inline-block
                vertical-align top
                line-height 24px
                margin 12px 0 0 12px
                font-size 10px
        .content-right
            flex 0 0 105px
            width 105px
            .pay
                height 48px
                line-height 48px
                text-align center
                font-size 12px
                font-weight 700
                background #2b333b
                &.not-enough
                    background #2b333b
                &.enough
                    background #00b43c
                    color #fff
    .shopcart-list
      position absolute
      left 0
      bottom 48px
      z-index -1
      width 100%
      // &.fold-transition
      //   transition  all 0.5s
      //   transform translate3d(0,-100%,0)
      // &.fold-enter,&.fold-leave
      //   transform translate3d(0,0,0)
      .list-header
        height 40px
        line-height 40px
        padding 0 18px
        background #f3f5f7
        border-bottom 1px solid rgba(7,17,27,0.1)
        .title
          float left
          font-size 14px
          color rgb(7,17,27)
        .empty
          float right
          font-size 12px
          color rgb(0,160,220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background #ffffff
        .food
          position relative
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7,17,27,0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7,17,27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            padding-right 6px
            font-size 14px
            font-weight 700
            color rgb(240,20,20)
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 6px
.list-mask
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 40
  backdrop-filter blur(5px)
  opacity 1
  background rgba(7,17,27,0.6)
</style>
