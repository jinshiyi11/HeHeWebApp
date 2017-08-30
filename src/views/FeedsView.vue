<template>
  <!--<scroller ref="feedListScroller" lock-x scrollbar-y use-pulldown use-pullup @on-pulldown-loading="onPullDown" @on-pullup-loading="onPullUp">-->
  <!--<scroller :on-refresh="onPullDown"
            :on-infinite="onPullUp">-->
  <vue-pull-refresh :on-refresh="onPullDown">
  <div class="list" id="list">
    <div class="item" v-for="item in feedList">
       <!--相册-->
      <router-link v-if="item.type==1" :to="{name:'AlbumView',params:{feedId:item.id}}">
        <p class="title">{{item.title}}</p>
        <div class="pic-container">
        <x-img class="pic" :src="getBigImgUrl(item.content)" default-src="/static/img/default.png" container="#list"></x-img>
        </div>
        <!--底部分享和收藏按鈕-->
        <div class="footer">
          <div class="footer-item">
            <img class="share" src="../assets/ic_redirect_normal.png"></img>
          </div>
          <i class="divider"></i>
          <div class="footer-item">
            <img class="star" src="../assets/ic_star_0.png"></img>
          </div>
        </div>
      </router-link>

      <!--视频-->
      <router-link v-else-if="item.type==2" :to="{name:'VideoView',params:{videoId:getVideoId(item)}}">
        <p class="title">{{item.title}}</p>
        <div class="pic-container">
        <img class="video" :src="require('../assets/imgs/ic_btn_video.png')"></img>
        <x-img class="pic" :src="getVideoImgUrl(item.content)" default-src="/static/img/default.png" container="#list"></x-img>
        </div>
        <!--底部分享和收藏按鈕-->
        <div class="footer">
          <div class="footer-item">
            <img class="share" src="../assets/ic_redirect_normal.png"></img>
          </div>
          <i class="divider"></i>
          <div class="footer-item">
            <img class="star" src="../assets/ic_star_0.png"></img>
          </div>
        </div>
      </router-link>
    </div>
    <infinite-loading :on-infinite="onPullUp" ref="infiniteLoading"></infinite-loading>
  </div>
  <!--</scroller>-->
  <!--  </scroller>-->
  </vue-pull-refresh>
</template>

<script>
import axios from 'axios'
// import jsonp from 'jsonp'
import * as Util from '@/util/util'
import { XImg } from 'vux'
import VuePullRefresh from 'vue-pull-refresh'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'feedsView',
  components: {
    'vue-pull-refresh': VuePullRefresh,
    XImg,
    InfiniteLoading
  },
  data () {
    // jsonp('http://hehedream.duapp.com/getfeeds?id=-1&count=-30&admin=shuai_xx_123456&ver=1.3&channel=default', null, function (err, data) {
    //   if (err) {
    //     console.error(err.message)
    //   } else {
    //     console.log(data)
    //   }
    // })

    return { feedList: [] }
  },
  methods: {
    getBigImgUrl (content) {
      return Util.getBigImgUrl(content)
    },
    getVideoImgUrl (content) {
      return Util.getVideoImgUrl(content)
    },
    getWebVideoUrl(content) {
      return Util.getWebVideoUrl(content)
    },
    getVideoId(item) {
      return JSON.parse(item.content).videoId
    },
    onPullDown() {
      console.log('onPullDown')
      let self = this
      return new Promise(function (resolve, reject) {
        axios.get(Util.getFeedListUrl(self.feedList[0].showTime, true))
          .then(function (response) {
            console.log(response)
            self.feedList.unshift(...response.data)
            resolve()
          })
      })
    },
    onPullUp() {
      console.log('onPullUp')
      let self = this
      axios.get(Util.getFeedListUrl(this.feedList.length === 0 ? -1 : this.feedList[this.feedList.length - 1].showTime, false))
      .then(function (response) {
        console.log(response)
        self.feedList.push(...response.data)
        self.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      })
    }
  },
  mounted () {
    // let self = this
    // axios.get(Util.getFeedListUrl())
    //   .then(function (response) {
    //     console.log('mounted')
    //     console.log(response)
    //     self.feedList.push(...response.data)
    //   })
  }
}
</script>

<style lang="less" scoped>
.list{
  background-color: #eeeeee;
}
.item{
  background-color: #ffffff;
  margin: 10px 0;
}
.title{
  font-size: 1rem;
  color: #333333;
  margin-left: 10px;
}
.pic-container{
  position: relative;
  height:180px;
  width:100%;
  margin: 5px 0;
}
.pic{
  display: block;
  max-width: 100%;
  max-height: 100%;
  margin: 0 auto;
}
.video {
  display: block;
  position: absolute;
  width: 70px;
  height: 70px;
  top: 50%;
  left: 50%; // margin-right: -50%;
  transform: translate(-50%, -50%)
}
.footer{
  height: 2rem;
  border-top: 1px solid #dadada;
  border-bottom: 1px solid #dadada;
  display: flex;
  align-items: center;
  .divider {
    height: 1.5rem;
    width: 1px;
    background-color: #dadada;
  }
  .footer-item{
    flex: 1;
    position: relative;
    height: 100%;
    .share{
      display: block;
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      top: 50%;
      left: 50%;
      // margin-right: -50%;
      transform: translate(-50%, -50%)
    }
    .star{
      display: block;
      position: absolute;
      width: 1.5rem;
      height: 1.5rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%)
    }
  }
}
</style>

