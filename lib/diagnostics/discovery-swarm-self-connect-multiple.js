var crypto = require('crypto')
var timers = require('timers')

var tape = require('tape')

var discoverySwarm = require('../discovery-swarm')

tape('Discovery-swarm self connect multiple', function (t) {
  t.timeoutAfter(60000)
  t.plan(10)
  t.on('end', function () {
    timers.setImmediate(process.exit)
  })

  for (var i = 0; i < 10; i++) {
    var swarmId = crypto.randomBytes(20)
    var myString = crypto.randomBytes(20)
    var swarm1 = discoverySwarm.runNode(swarmId.toString('hex'), myString)
    discoverySwarm.runNode(swarmId.toString('hex'))

    swarm1.on('echo', function () {
      t.pass('Message was echoed')
    })
  }
})
