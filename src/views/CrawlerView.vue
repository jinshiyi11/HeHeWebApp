<template>
  <div>
    <x-button type="primary" @click.native="onStartClick">
      {{status==0?"开始":"停止"}}</x-button>
    <br/>
    日志:
    <div>
      {{log}}
    </div>
  </div>
</template>

<<script>
import axios from 'axios'
import * as Util from '@/util/util'
import { XButton } from 'vux'

export default {
  components: {
    XButton
  },
  data () {
    return {
      status: 0,
      log: '',
      logStartIndex: 0,
      timeoutId: 0
    }
  },
  activated() {
    this.updateStatus()
  },
  deactivated() {
    this.status = 0
    this.log = ''
    this.logStartIndex = 0
    clearTimeout(this.timeoutId)
  },
  methods: {
    onStartClick() {
      if (this.status === 0) {
        axios.get(Util.getStartCrawlerUrl())
      } else {
        axios.get(Util.getStopCrawlerUrl())
      }
    },
    updateStatus() {
      axios.get(Util.getCrawlerStatusUrl())
      .then(response => {
        this.status = response.data
        if (this.status === 1) {
          axios.get(Util.getCrawlerLogUrl())
          .then(response => {
            this.log = this.log + response.data.log
            this.logStartIndex = response.data.logStartIndex
            this.timeoutId = setTimeout(this.updateStatus, 3000)
          })
        } else {
          this.timeoutId = setTimeout(this.updateStatus, 3000)
        }
      })
    }
  }
}
</script>

