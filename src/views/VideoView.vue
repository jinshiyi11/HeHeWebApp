<template>
  <div>
    <div v-if="loading">
      视频加载中...
    </div>
    <div v-else-if="!loadSuccess">网络异常</div>
    <div id="videoContainer" v-else>
      <!--<video class="video" controls="controls" :src="videoInfo.url">
          </video>      -->
      <video id="my-player" class="video-js vjs-default-skin vjs-fluid" controls autoplay preload="auto" >
        <source :src="videoInfo.url" type="video/mp4"></source>
      </video>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as Util from '@/util/util'
import * as Log from '@/util/log'
import { base64 } from 'vux'
import videojs from 'video.js'
import Vue from 'Vue'

export default {
  data() {
    return {
      loading: true,
      loadSuccess: false,
      videoInfo: {
        url: ''
      },
      player: undefined
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
        // this.videoInfo.url = Util.getProxyUrl(this.getVideoUrl(response))
        this.videoInfo.url = this.getVideoUrl(response)

        Vue.nextTick(() => {
          var options = { autoplay: true }
          videojs.log('xxxxon?!')

          // let self = this
          this.player = videojs('my-player', options, function onPlayerReady() {
            // In this context, `this` is the player that was created by Video.js.
            this.play()
            // this.enterFullScreen()
            // self.$el.querySelector('video').webkitRequestFullScreen()
          })
        })
      }).catch(err => {
        Log.log(err)
        this.loading = false
        this.loadSuccess = false
        this.videoInfo.url = ''
        if (this.player) {
          Log.log('reset video')
          this.player.reset()
          this.player.dispose()
          this.player = undefined
        }
      })
  },
  deactivated() {
    Log.log('deactivated')
    this.loading = true
    this.loadSuccess = false
    this.videoInfo.url = ''
    if (this.player) {
      Log.log('reset video')
      this.player.reset()
      this.player.dispose()
      this.player = undefined
    }
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

