var crypto = require('crypto')
var timers = require('timers')

var tape = require('tape')

var discoverySwarm = require('../discovery-swarm')

tape('Discovery-swarm remote connect', function (t) {
  t.timeoutAfter(60000)
  t.on('end', function () {
    timers.setImmediate(process.exit)
  })

  var myString = crypto.randomBytes(20)
  var swarm = discoverySwarm.runNode('y-u-no-p2p', myString)

  swarm.on('echo', function (peer) {
    t.pass('Message was echoed')
    t.end()
  })
})
