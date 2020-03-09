<template>
  <div class="food" v-show="showFlag" ref="foodScroll">
      <div class="food-content">
          <div class="image-header">
              <img :src="food.image">
              <div class="back" @click="hide">
                <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
              <h1 class="title">{{food.name}}</h1>
              <div class="detail">
                  <span class="sell-count">月售{{food.sellCount}}份</span>
                  <div class="grating">好评率{{food.rating}}%</div>
              </div>
              <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="buy" @click.stop.prevent="addFirst"
           v-show="!food.count || food.count === 0">加入购物车</div>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect @ratingtype_select="rtselect" @content_toggle="cttoggle"
            :selectType="selectType" :onlyContent="onlyContent"
             :desc="desc" :ratings="food.ratings"></ratingselect>
             <div class="rating-wrapper">
               <ul v-show="food.ratings && food.ratings.length">
                 <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating, index) in food.ratings" :key="index" class="rating-item border-1px">
                   <div class="user">
                     <span class="name">{{rating.username}}</span>
                     <img class="avatar" :src="rating.avatar" width="12" height="12">
                   </div>
                   <div class="time">{{rating.rateTime | formatData}}</div>
                   <p class="text">
                     <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                     {{rating.text}}
                   </p>
                 </li>
               </ul>
               <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
             </div>
          </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import Vue from 'vue'
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/data'

// const POSITIVE = 0
// const NEGATIVE = 1
const ALL = 2
export default {
  name: 'food',
  data () {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.selectType = ALL
      this.onlyContent = false
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodScroll, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    addFirst () {
      Vue.set(this.food, 'count', 1)
    },
    needShow (type, text) {
      if (this.onlyContent && !text) { // 判断是否有内容
        return false
      }
      if (this.selectType === ALL) {
        return true
      } else {
        return type === this.selectType
      }
    },
    rtselect (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    cttoggle (content) {
      this.onlyContent = content
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  filters: {
    formatData (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  props: ['food']
}
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
@import "../../common/stylus/mixin"
.food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background  #ffffff
    .image-header
        position relative
        width 100%
        height 0
        padding-top 100%
        img
            position absolute
            top 0
            left 0
            width 100%
            height 100%
        .back
            position absolute
            top 10px
            left 0
            .icon-arrow_lift
                display block
                padding 10px
                font-size 20px
                color #ffffff
    .content
        position relative
        padding 18px
        .title
            line-height 14px
            margin-bottom 8px
            font-size 14px
            font-weight 700
            color rgb(7,17,27)
        .detail
            margin-bottom 18px
            height 10px
            line-height 10px
            font-size 0
            .sell-count,.grating
                float left
                font-size 10px
                color rgb(147,153,159)
            .sell-count
                margin-right 12px
        .price
            font-weight 700
            line-height 24px
            .now
              margin-right 18px
              fint-size 14px
              color rgb(240,20,20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147,153,159)
      .cartcontrol-wrapper
          position absolute
          right 12px
          bottom 12px
      .buy
          position absolute
          right 18px
          bottom 18px
          z-index 10
          height 24px
          line-height 24px
          padding 0 12px
          box-sizing border-box
          border-radius 12px
          font-size 10px
          background rgb(0,160,220)
          color #ffffff
      .info
          padding 18px
          .title
              line-height 14px
              margin-bottom 6px
              font-size 14px
              color rgb(7,17,27)
              font-weight 700
          .text
              line-height 24px
              padding 0 8px
              font-size 12px
              color rgb(77,85,93)
      .rating
            padding-top 18px
            .title
                line-height 14px
                margin-left 18px
                font-size 14px
                color rgb(7,17,27)
                font-weight 700
            .rating-wrapper
              padding 0 18px
              .rating-item
                position relative
                padding   16px 0
                border-1px(rgba(7,17,27,0.1))
              .user
                position absolute
                right 0
                top 16px
                line-height 12px
                font-size 0
                .name
                  display inline-block
                  margin-right 6px
                  vertical-align top
                  font-size 10px
                  color rgb(147,153,159)
                .avatar
                  border-radius 50%
              .time
                margin-bottom 6px
                line-height 12px
                font-size 6px
                color rgb(147,153,159)
              .text
                line-height 16px
                font-size 12px
                color rgb(7,17,27)
                .icon-thumb_up,icon-thumb_down
                  margin-right 4px
                  line-height 16px
                  font-size 12px
                .icon-thumb_up
                  color rgb(0,160,220)
                .icon-thumb_down
                  color rgb(147,153,159)
              .no-rating
                padding 16px 0
                font-size 12px
                color rgb(147,153,159)

</style>
