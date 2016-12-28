'use strict';

/* variables define */
// eslint-disable-next-line no-unused-vars
var downloadUrl;

/* client device & os detect */
function isAndroid() {
  return $.ua.os.name === 'Android';
}

function isiOS () {
  return $.ua.os.name === 'iOS';
}

console.log($.ua);
console.log('Android: ' + isAndroid());
console.log('iOS: ' + isiOS());

/* parse params */
var searchParams = new URLSearchParams(window.location.search);

/* get channel info */
axios.get('./channel.json')
  .then(function(response) {
    return response.data;
  }).then(function(data) {
    return data.channels;
  }).then(function(channels) {
    var channelId = searchParams.get('channel');
    console.log(channelId);
    var channel = channels[channelId];
    downloadUrl = channel.downLoadUrl;

    // eslint-disable-next-line no-unused-vars
    var app = new Vue({
      el: '#vueapp',
      data: {
        ua: $.ua,
        channel: channel
      }
    });
  }).catch(function() {
    // var el = document.getElementsByClassName("message");
    // el.parentNode.replaceChild('<>')
    var model = $('[data-remodal-id=modal]').remodal();
    model.open();
  });


