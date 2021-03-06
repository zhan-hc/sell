<template>
  <div class="ratings"  ref="ratingScroll">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star :size="36" :score="seller.serviceScore"></star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star :size="36" :score="seller.foodScore"></star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <split></split>
        <ratingselect @ratingtype_select="rtselect" @content_toggle="cttoggle"
            :selectType="selectType" :onlyContent="onlyContent"
             :desc="desc" :ratings="ratings"></ratingselect>
        <div class="rating-wrapper">
          <ul>
            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating, index) in ratings" :key="index" class="rating-item border-1px">
              <div class="avatar">
                <img :src="rating.avatar" width="28" height="28">
              </div>
              <div class="content">
                <div class="name">{{rating.username}}</div>
                <div class="star-wrapper">
                  <span class="star-wrapper">
                    <star :size="24" :score="rating.score"></star>
                    <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                  </span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="(item,index1) in rating.recommend" :key="index1">{{item}}</span>
                </div>
                <div class="time">
                  {{rating.rateTime | formatData}}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import star from '../star/star'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
import {formatDate} from '../../common/js/data'
const ALL = 2
const ERR_OK = 0
export default {
  name: 'ratings',
  data () {
    return {
      ratings: [],
      // showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body
      if (response.error === ERR_OK) {
        this.ratings = response.data
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.ratingScroll, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
    })
  },
  filters: {
    formatData (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  methods: {
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
    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  props: ['seller']
}
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
@import "../../common/stylus/mixin"
.ratings
  position absolute
  top 174px
  bottom 0
  width 100%
  overflow hidden
  .overview
    display flex
    padding 18px 0
    .overview-left
      flex 0 0 137px
      padding 6px 0
      width 137px
      border-right 1px solid rgba(7,17,27,0.1)
      text-align center
      @media only screen and (max-width:320px)
        flex: 0 0 120px
        width 120px
      .score
        line-height 28px
        font-size 24px
        color rgb(255,153,0)
      .title
        margin-bottom 8px
        line-height 12px
        font-size 12px
        color rgb(7,17,27)
      .rank
        line-height 10px
        font-size 10px
        color rgb(147,153,159)
    .overview-right
      flex 1
      padding 6px 0 6px 24px
      @media only screen and (max-width:320px)
        padding 6px
      .score-wrapper
        margin-bottom 8px
        font-size 0
        .title
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(7,17,27)
        .star
          display inline-block
          margin 0 12px
          vertical-align top
        .score
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(255,153,0)
      .delivery-wrapper
        font-size 0
        .title
          line-height 18px
          font-size 12px
          color rgb(7,17,27)
        .delivery
          margin-left 12px
          font-size 12px
          color rgb(147,153,159)
  .rating-wrapper
    padding 0 18px
    .rating-item
      display flex
      padding 18px 0
      border-1px(rgba(7,17,27,0.1))
      .avatar
        flex 0 0 28px
        width 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        position relative
        flex 1
        .name
          margin-bottom 4px
          line-height 12px
          font-size 10px
          color rgb(7,17,27)
        .star-wrapper
          margin-bottom 6px
          font-size 0
          .star
            display inline-block
            margin-right 6px
            vertical-align top
          .delivery
            display inline-block
            vertical-align top
            line-height 12px
            color rgb(147,153,159)
        .text
          margin-bottom 8px
          line-height 18px
          color rgb(7,17,27)
          font-size 12px
        .recommend
          line-height 16px
          font-size 0
          .icon-thumb_up,.item
            display inline-block
            margin 0 8px 4px 0
            font-size 9px
          .icon-thumb_up
            color rgb(0,160,220)
          .item
            padding 0 6px
            border: 1px splid rgba(7,17,27,0.1)
            color rgb(147,153,159)
            background #ffffff
            border-radius 1px
        .time
          position absolute
          top 0
          right 0
          line-height 10px
          font-size 10px
          color rgb(7,17,27)

</style>
