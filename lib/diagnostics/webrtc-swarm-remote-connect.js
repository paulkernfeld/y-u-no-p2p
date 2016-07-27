var tape = require('tape')

var webrtc = require('./../webrtc')

tape('Webrtc-swarm remote connect', function (t) {
  t.timeoutAfter(30000)
  t.plan(2)
  t.on('end', function () {
    webrtc.closeWrtc()
  })

  var swarm = webrtc.runSwarmNode()
  swarm.on('echo', function () {
    t.pass('echoed')
    swarm.close(t.error)
  })
})
