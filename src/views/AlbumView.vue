<template>
  <div class="albums">
    <div v-if="loading">正在加载</div>
    <div v-else-if="!loadSuccess">网络异常</div>
    <div v-else>
      <swiper class="swiper" :show-dots="false" height="100vh" v-model="currentIndex" @on-index-change="onIndexChanged">
        <img class="back" src="../assets/ic_menu_back.png" @click="$router.go(-1)"></img>
        <div class="title">{{currentIndex+1}}/{{imageList.length}}</div>
        <swiper-item v-for="(item, index) in imageList" :key="index" ref="swiperItems">
          <x-img class="album-img" :src="getProxyUrl(item.bigUrl)" container=".swiper"></x-img>
        </swiper-item>
        <div class="desc">{{imageList[currentIndex].description}}</div>
      </swiper>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as Util from '@/util/util'
import { Swiper, SwiperItem, XImg } from 'vux'

export default {
  components: {
    Swiper,
    SwiperItem,
    XImg
  },
  data() {
    return {
      loading: true,
      loadSuccess: false,
      currentIndex: 0,
      imageList: []
    }
  },
  created() {
    axios.get(this.getAlbumPicsUrl(this.$route.params.feedId))
      .then(response => {
        console.log(response)
        this.loading = false
        this.loadSuccess = true
        this.imageList.push(...response.data)
      }).catch(err => {
        console.log(err)
        this.loading = false
        this.loadSuccess = false
      })
  },
  methods: {
    getAlbumPicsUrl(feedId) {
      return Util.getAlbumPicsUrl(feedId)
    },
    getProxyUrl(rawUrl) {
      return Util.getProxyUrl(rawUrl)
    },
    onIndexChanged(index) {
      console.log(`onIndexChanged:${index}`)
      // currentIndex = index
      // console.log(this.$refs.swiperItems[index])
      // 由于滑动翻页时translate不会触发图片加载，所以暂时强制加载
      this.$refs.swiperItems[index].$children[0].blazy.load(this.$refs.swiperItems[index].$children[0].$el, true)
    }
  }
}
</script>

<style lang="less" scoped>
.albums{
  .back{
    width: 2rem;
    height: 2rem;
    z-index: 200;
    position: absolute;
  }
  .title{
    height: 2rem;
    line-height: 2rem;
    z-index: 100;
    position: absolute;
    width: 100%;
    text-align: center;
    vertical-align: middle;
    background-color: rgba(0,0,0,0.5);
    color: #ffffff;
    font-size: 0.8rem;
  }
  .swiper{
    background-color: #000000
  }
  .desc{
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: left;
    background-color: rgba(0,0,0,0.5);
    color: #ffffff;
    font-size: 0.8rem;
    padding: 3px 8px;
  }
  .album-img{
    max-height:100%;
    max-width:100%;
    display: block;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

</style>

