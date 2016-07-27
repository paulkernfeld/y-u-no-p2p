var crypto = require('crypto')
var timers = require('timers')

var tape = require('tape')

var webrtc = require('../webrtc')

tape('Webrtc-swarm self connect single', function (t) {
  t.timeoutAfter(30000)
  t.plan(2)
  t.on('end', function () {
    timers.setImmediate(process.exit)
  })

  var swarmId = crypto.randomBytes(20).toString('hex')
  var swarm1 = webrtc.runSwarmNode(swarmId)
  var swarm2 = webrtc.runSwarmNode(swarmId)

  swarm1.on('echo', function () { t.pass('Echo from 1') })
  swarm2.on('echo', function () { t.pass('Echo from 2') })
})
