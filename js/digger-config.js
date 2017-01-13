'use strict';

window._digger_ = {
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
    selectors: ["a[id='android']"],
    extendParams: {
      event_flag: 'downloadClick',
      act: 'click',
      downloadUrl: window.downloadUrl
    }
  }]
};

var e = document.createElement('script');
e.src = 'js/vendor/digger.min.js';
e.type = 'text/javascript';
e.async = true;
e.defer = true;
var e0 = document.getElementsByTagName('script')[0];
e0.parentNode.insertBefore(e, e0);