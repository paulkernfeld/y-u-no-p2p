var timers = require('timers')

var tape = require('tape')

var webrtc = require('./../webrtc')

tape('Webrtc-swarm remote connect', function (t) {
  t.timeoutAfter(30000)
  t.plan(1)
  t.on('end', function () {
    timers.setImmediate(process.exit)
  })

  var swarm = webrtc.runSwarmNode()
  swarm.on('echo', t.pass)
})
