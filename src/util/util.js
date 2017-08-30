// 是否使用代理
const USE_PROXY = true
// const HOST = 'http://hehedream.duapp.com'
const HOST = 'http://localhost:8080'

export function getFeedListUrl(showTime = -1, pulldown = false) {
  let count = -30
  if (pulldown) {
    count = 30
  }
  return HOST + '/getfeeds?id=' + showTime + '&count=' + count + '&admin=shuai_xx_123456&ver=1.3&channel=default'
}

export function getAlbumPicsUrl(feedId) {
  return HOST + '/getalbumpics?feedid=' + feedId
}

export function getThumbImgUrl(content) {
  return getProxyUrl(JSON.parse(content).thumbImgUrl)
  // return 'http://hehedream.duapp.com/proxy.jsp?' + JSON.parse(content).thumbImgUrl
  // return 'https://bird.ioliu.cn/v1?url=' + JSON.parse(content).thumbImgUrl
}

export function getBigImgUrl(content) {
  return JSON.parse(content).bigImgUrl
  // return getProxyUrl(JSON.parse(content).bigImgUrl)
}

export function getVideoImgUrl(content) {
  return JSON.parse(content).videoThumbUrl
  // return getProxyUrl(JSON.parse(content).videoThumbUrl)
}

export function getWebVideoUrl(content) {
  return JSON.parse(content).webVideoUrl
}

export function getStartCrawlerUrl() {
  return HOST + '/crawler?action=start'
}

export function getStopCrawlerUrl() {
  return HOST + '/crawler?action=stop'
}

export function getCrawlerStatusUrl() {
  return HOST + '/crawler?action=status'
}

export function getCrawlerLogUrl(logStartIndex) {
  return HOST + '/crawler?action=log&start=' + logStartIndex
}

export function getProxyUrl(rawUrl) {
  if (USE_PROXY) {
    return 'http://hehedream.duapp.com/proxy.jsp?' + rawUrl
  } else {
    return rawUrl
  }
}

export function getJsonUrl(rawUrl) {
  if (USE_PROXY) {
    return 'https://bird.ioliu.cn/v1?url=' + rawUrl
  } else {
    return rawUrl
  }
}

/**
 * 生成阳光视频信息查询接口
 */
export function getYgVideoInfoUrl(videoId) {
  let e = document.createElement('a')
  e.href = 'http://ib.365yg.com/video/urls/v/1/toutiao/mp4/' + videoId
  let n = (function () {
    for (var t = 0, e = new Array(256), n = 0; n !== 256; ++n) {
      t = n
      t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1
      t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1
      t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1
      t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1
      t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1
      t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1
      t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1
      t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1
      e[n] = t
    }
    return typeof Int32Array !== 'undefined' ? new Int32Array(e) : e
  }())

  let o = function (t) {
    for (var e, o, r = -1, i = 0, a = t.length; i < a;) {
      e = t.charCodeAt(i++)
      e < 128 ? r = r >>> 8 ^ n[255 & (r ^ e)] : e < 2048 ? (r = r >>> 8 ^ n[255 & (r ^ (192 | e >> 6 & 31))],
        r = r >>> 8 ^ n[255 & (r ^ (128 | 63 & e))]) : e >= 55296 && e < 57344 ? (e = (1023 & e) + 64,
        o = 1023 & t.charCodeAt(i++),
        r = r >>> 8 ^ n[255 & (r ^ (240 | e >> 8 & 7))],
        r = r >>> 8 ^ n[255 & (r ^ (128 | e >> 2 & 63))],
        r = r >>> 8 ^ n[255 & (r ^ (128 | o >> 6 & 15 | (3 & e) << 4))],
        r = r >>> 8 ^ n[255 & (r ^ (128 | 63 & o))]) : (r = r >>> 8 ^ n[255 & (r ^ (224 | e >> 12 & 15))],
        r = r >>> 8 ^ n[255 & (r ^ (128 | e >> 6 & 63))],
        r = r >>> 8 ^ n[255 & (r ^ (128 | 63 & e))])
    }
    return r ^ -1
  }

  let r = e.pathname + '?r=' + Math.random().toString(10).substring(2)
  r[0] !== '/' && (r = '/' + r)
  let i = o(r) >>> 0
  return ['http:', e.hostname].join('//') + r + '&s=' + i
}

/*
function crc32(t) {
  var e = document.createElement("a");
  e.href = t;
  var n = function () {
    for (var t = 0, e = new Array(256), n = 0; 256 != n; ++n)
      t = n,
        t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1,
        t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1,
        t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1,
        t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1,
        t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1,
        t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1,
        t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1,
        t = 1 & t ? -306674912 ^ t >>> 1 : t >>> 1,
        e[n] = t;
    return "undefined" != typeof Int32Array ? new Int32Array(e) : e
  }()
    , o = function (t) {
      for (var e, o, r = -1, i = 0, a = t.length; i < a;)
        e = t.charCodeAt(i++),
          e < 128 ? r = r >>> 8 ^ n[255 & (r ^ e)] : e < 2048 ? (r = r >>> 8 ^ n[255 & (r ^ (192 | e >> 6 & 31))],
            r = r >>> 8 ^ n[255 & (r ^ (128 | 63 & e))]) : e >= 55296 && e < 57344 ? (e = (1023 & e) + 64,
              o = 1023 & t.charCodeAt(i++),
              r = r >>> 8 ^ n[255 & (r ^ (240 | e >> 8 & 7))],
              r = r >>> 8 ^ n[255 & (r ^ (128 | e >> 2 & 63))],
              r = r >>> 8 ^ n[255 & (r ^ (128 | o >> 6 & 15 | (3 & e) << 4))],
              r = r >>> 8 ^ n[255 & (r ^ (128 | 63 & o))]) : (r = r >>> 8 ^ n[255 & (r ^ (224 | e >> 12 & 15))],
                r = r >>> 8 ^ n[255 & (r ^ (128 | e >> 6 & 63))],
                r = r >>> 8 ^ n[255 & (r ^ (128 | 63 & e))]);
      return r ^ -1
    }
    , r = e.pathname + "?r=" + Math.random().toString(10).substring(2);
  "/" != r[0] && (r = "/" + r);
  var i = o(r) >>> 0
    , a = location.protocol.indexOf("http") > -1;
  return (a ? [location.protocol, e.hostname] : ["http:", e.hostname]).join("//") + r + "&s=" + i
}
*/
