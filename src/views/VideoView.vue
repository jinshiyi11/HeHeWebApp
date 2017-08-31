<template>
  <div class="main">
    <img class="back" src="../assets/ic_menu_back.png" @click="$router.go(-1)"></img>
    <div class="title">title</div>
    <div class="center" v-if="loading">
      视频加载中...
    </div>
    <div class="center" v-else-if="!loadSuccess">网络异常</div>
    <div v-else>
      <!--<video class="video" controls="controls" :src="videoInfo.url">
            </video>      -->
      <!--<video id="my-player" class="video-js vjs-default-skin vjs-fluid" controls autoplay preload="auto">
        <source :src="videoInfo.url" type="video/mp4"></source>
      </video>-->
      <video-player class="video-player-box" :options="playerOptions">
      </video-player>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as Util from '@/util/util'
import * as Log from '@/util/log'
import { base64 } from 'vux'
// import videojs from 'video.js'
// import Vue from 'Vue'
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  data() {
    return {
      loading: true,
      loadSuccess: false,
      // videoInfo: {
      //   url: ''
      // },
      // player: undefined,
      playerOptions: {
        autoplay: true,
        fluid: true,
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        poster: ''
      }
    }
  },
  mounted() {
    Log.log('mounted video')
  },
  activated() {
    Log.log('activated')
    let videoInfoUrl = Util.getJsonUrl(Util.getYgVideoInfoUrl(this.$route.params.videoId))
    Log.log('videoInfoUrl:' + videoInfoUrl)
    axios.get(videoInfoUrl)
      .then(response => {
        Log.log(response)
        this.loading = false
        this.loadSuccess = true
        // this.videoInfo.url = this.getVideoUrl(response)
        this.playerOptions.sources[0].src = this.getVideoUrl(response)

        // Vue.nextTick(() => {
        //   var options = { autoplay: true }
        //   videojs.log('xxxxon?!')

        //   // let self = this
        //   this.player = videojs('my-player', options, function onPlayerReady() {
        //     // In this context, `this` is the player that was created by Video.js.
        //     this.play()
        //     // this.enterFullScreen()
        //     // self.$el.querySelector('video').webkitRequestFullScreen()
        //   })
        // })
      }).catch(err => {
        Log.log(err)
        this.loading = false
        this.loadSuccess = false
        // this.videoInfo.url = ''
        // if (this.player) {
        //   Log.log('reset video')
        //   this.player.reset()
        //   this.player.dispose()
        //   this.player = undefined
        // }
      })
  },
  deactivated() {
    Log.log('deactivated')
    this.loading = true
    this.loadSuccess = false
    // this.videoInfo.url = ''
    // if (this.player) {
    //   Log.log('reset video')
    //   this.player.reset()
    //   this.player.dispose()
    //   this.player = undefined
    // }
  },
  methods: {
    getVideoUrl(response) {
      let base64Url
      if (response.data.data.video_list.video_3 !== undefined) {
        base64Url = response.data.data.video_list.video_3.main_url
      } else if (response.data.data.video_list.video_2 !== undefined) {
        base64Url = response.data.data.video_list.video_2.main_url
      } else if (response.data.data.video_list.video_1 !== undefined) {
        base64Url = response.data.data.video_list.video_1.main_url
      }
      return base64.decode(base64Url)
    }

  }
}
</script>

<style src='video.js/dist/video-js.min.css'>

</style>
<style lang="less" scoped>
.main {
  height: 100vh;
  background-color: #000;
}
.back {
  width: 2rem;
  height: 2rem;
  z-index: 200;
  position: absolute;
}
.title {
  height: 2rem;
  line-height: 2rem;
  z-index: 100;
  position: absolute;
  width: 100%;
  text-align: center;
  vertical-align: middle;
  color: #ffffff;
  font-size: 0.8rem;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  color: #fff;
}
.center-video{
  max-width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>

