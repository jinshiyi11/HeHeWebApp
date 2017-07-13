<template>
<div>
  <div v-for="item in feedList">
    <a class="title">{{item.title}}</a><br/>
    <img :src="getThumbImgUrl(item.content)"></img>
  </div>
</div>
</template>

<script>
import axios from 'axios'
// import jsonp from 'jsonp'

export default {
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
    getThumbImgUrl (content) {
      return 'http://hehedream.duapp.com/proxy.jsp?' + JSON.parse(content).thumbImgUrl
    }
  },
  mounted () {
    let self = this
    axios.get('https://bird.ioliu.cn/v1?url=http://hehedream.duapp.com/getfeeds?id=-1&count=-30&admin=shuai_xx_123456&ver=1.3&channel=default')
      .then(function (response) {
        console.log(response)
        self.feedList.push(...response.data)
      })
  }
}
</script>


<style>
.title{
  font-size: 0.8rem;
  color: #0000ff;
}

</style>

