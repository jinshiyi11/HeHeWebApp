// 是否使用代理
const USE_PROXY = process.env.NODE_ENV !== 'production'
const HOST = 'http://hehedream.duapp.com'

export function getFeedListUrl(showTime = -1, pulldown = false) {
  let count = -30
  if (pulldown) {
    count = 30
  }
  return getJsonUrl(HOST + '/getfeeds?id=' + showTime + '&count=' + count + '&admin=shuai_xx_123456&ver=1.3&channel=default')
}

export function getAlbumPicsUrl(feedId) {
  return getJsonUrl(HOST + '/getalbumpics?feedid=' + feedId)
}

export function getThumbImgUrl(content) {
  if (USE_PROXY) {
    return getProxyUrl(JSON.parse(content).thumbImgUrl)
    // return 'http://hehedream.duapp.com/proxy.jsp?' + JSON.parse(content).thumbImgUrl
    // return 'https://bird.ioliu.cn/v1?url=' + JSON.parse(content).thumbImgUrl
  } else {
    return JSON.parse(content).thumbImgUrl
  }
}

export function getBigImgUrl(content) {
  if (USE_PROXY) {
    return getProxyUrl(JSON.parse(content).bigImgUrl)
  } else {
    return JSON.parse(content).bigImgUrl
  }
}

export function getProxyUrl(rawUrl) {
  if (USE_PROXY) {
    return 'http://hehedream.duapp.com/proxy.jsp?' + rawUrl
  } else {
    return rawUrl
  }
}

function getJsonUrl(rawUrl) {
  if (USE_PROXY) {
    return 'https://bird.ioliu.cn/v1?url=' + rawUrl
  } else {
    return rawUrl
  }
}
