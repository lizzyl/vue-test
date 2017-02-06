'use strict';

/* variables define */
// eslint-disable-next-line no-unused-vars

// var digger = require('js/vendor/digger.min.js');

var _hmt;
var _digger_ = '';

/* client device & os detect */
function isAndroid() {
  return $.ua.os.name === 'Android';
}

function isiOS() {
  return $.ua.os.name === 'iOS';
}

function isWechat() {
  return $.ua.browser.name === 'WeChat';
}

function isWeibo() {
  return /weibo/i.test($.ua.ua);
}

/* parse params */
var searchParams = new URLSearchParams(window.location.search.slice(1));


/* get channel info */
axios.get('./data/data.json')
  .then(function(response) {
    return response.data;
  }).then(function(data) {
    // var json = eval('(' + data + ')');
    // var json = JSON.parse(JSON.stringify(data))
    return data.channels;
  }).then(function(channels) {
    var downloadUrl;
    var channelId = searchParams.get('channel');
    var len = channels.length;
    for (var i = 0; i < len; i++) {
      if (channels[i].channelId == channelId) {
        var channel = channels[i];

        /*-------------这里取得是安卓下载地址，如果是ios 请取值为channel.content.download.iosUrl------------------*/
        downloadUrl = channel.content.download.androidUrl;
        break;
      }
    }
    // eslint-disable-next-line no-unused-vars
    var appHead = new Vue({
      el: 'head',
      data: {
        head: channel.head
      }
    });
    // eslint-disable-next-line no-unused-vars
    var app = new Vue({
      el: '.wrap',
      data: {
        channel: channel,
        show: false,
        iosUrl: 'javascript:;',
        androidUrl: 'javascript:;',
        bgObject: {}
      },
      created: function() {
        var that = this;
        //百度统计 start
        _hmt = _hmt || [];
        var hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?' + channel.content.baiduAnalytic;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
        //百度统计 end
        that.bgObject = {
          background: '#fff url(' + channel.content.bgImg + ') no-repeat'
        };

        _digger_ = {
          disablePageViewTrack: false,
          trackerUrlMap: {
            pageView: ['//bicollect.hulai.com:8182/api'],
            click: ['//bicollect.hulai.com:8182/api']
          },
          cookieDomain: '',
          strictMode: {
            paramOrder: {
              '//bicollect.hulai.com:8182/api': ['cookie', 'url', 'referer', 'metric', 'snid', 'gameid', 'downloadUrl', 'act']
            },
            disableDefaultParams: true
          },
          extendParams: {
            metric: 'Landing',
            snid: window.snid,
            gameid: window.gameid,
            referer: document.referrer ? document.referrer : '',
            act: 'visit',
            downloadUrl: ''
          },
          trackCookieKeys: {
            cookie: 'cookie_id'
          },
          trackLocalStorageKeys: {
            latitude: 'location.latitude',
            longitude: 'location.longitude'
          },
          eventConfigArr: [{
            eventType: 'click',
            selectors: ['a[id="android"]'],
            extendParams: {
              event_flag: 'downloadClick',
              act: 'click',
              downloadUrl: downloadUrl
            }
          }]
        };
        var digger = document.createElement('script');
        digger.src = 'http://s0.web.hulai.com/static/digger/digger-20170113164255.min.js';
        var s1 = document.getElementsByTagName('script')[1];
        s1.parentNode.insertBefore(digger, s1);

      },
      methods: {
        androidClick: function() {
          if (isWechat() || isWeibo()) {
            this.show = true;
          } else {
            // this.androidUrl = channel.content.download.androidUrl;
            window.location.replace(channel.content.download.androidUrl);
          }
          window._hmt.push(['_trackEvent', 'software', 'androidClick', 'ttplayer']);
        },
        iosClick: function() {
          if (isWechat() || isWeibo()) {
            this.show = true;
          } else {
            window.location.replace(channel.content.download.iosUrl);
            // this.iosUrl = channel.content.download.iosUrl;
          }
          window._hmt.push(['_trackEvent', 'software', 'iosClick', 'ttplayer']);
        },
        closeTip: function() {
          this.show = false;
        }
      }
    });

  }).catch(function() {
    // var el = document.getElementsByClassName('message');
    // el.parentNode.replaceChild('<>')
    // var model = $('[data-remodal-id=modal]').remodal();
    // model.open();
  });
