var crypto = require('crypto')

var tape = require('tape')

var webrtc = require('../webrtc')

tape('Webrtc-swarm self connect single', function (t) {
  t.timeoutAfter(30000)
  t.plan(4)
  t.on('end', function () {
    webrtc.closeWrtc()
  })

  var swarmId = crypto.randomBytes(20).toString('hex')
  var swarm1 = webrtc.runSwarmNode(swarmId)
  var swarm2 = webrtc.runSwarmNode(swarmId)

  swarm1.on('echo', function () {
    t.pass('Echo from 1')
    swarm1.close(t.error)
  })
  swarm2.on('echo', function () {
    t.pass('Echo from 2')
    swarm2.close(t.error)
  })
})
