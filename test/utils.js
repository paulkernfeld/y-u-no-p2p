var crypto = require('crypto')

var electronWrtc = require('electron-webrtc')
var signalhub = require('signalhub')
var tape = require('tape')

var utils = require('../lib/utils')

tape('Close wrtc', function (t) {
  var wrtc = electronWrtc()
  wrtc.close()
  t.end()
})

tape('Close signalhub', function (t) {
  var hub = signalhub(
    crypto.randomBytes(20).toString('hex'),
    [utils.signalhubUrl]
  )
  var subscriber = hub.subscribe('meow')
  hub.broadcast('meow', 'whatever')
  subscriber.on('data', console.log)
  subscriber.destroy()
  utils.destroySignalhub(hub)
  t.end()
})
