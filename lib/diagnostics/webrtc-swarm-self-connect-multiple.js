var crypto = require('crypto')

var tape = require('tape')

var webrtc = require('../webrtc')

tape('Webrtc-swarm self connect multiple', function (t) {
  t.timeoutAfter(30000)
  t.plan(4 * 10)
  t.on('end', function () {
    webrtc.closeWrtc()
  })

  var is = []
  for (var i = 0; i < 10; i++) {
    is.push(i)
  }

  is.forEach(function (i) {
    var swarmId = crypto.randomBytes(20).toString('hex')
    var swarmA = webrtc.runSwarmNode(swarmId)
    var swarmB = webrtc.runSwarmNode(swarmId)

    swarmA.on('echo', function () {
      t.pass('Echo from A ' + i)
      swarmA.close(t.error)
    })
    swarmB.on('echo', function () {
      t.pass('Echo from B ' + i)
      swarmB.close(t.error)
    })
  })
})
