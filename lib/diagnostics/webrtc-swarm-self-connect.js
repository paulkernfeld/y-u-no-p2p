var crypto = require('crypto')
var timers = require('timers')

var wrtc = require('electron-webrtc')()
var signalhub = require('signalhub')
var tape = require('tape')
var WebrtcSwarm = require('webrtc-swarm')

var utils = require('../utils')

tape('Webrtc-swarm self-connect', function (t) {
  t.timeoutAfter(30000)
  t.on('end', function () {
    timers.setImmediate(process.exit)
  })

  var hub = signalhub(crypto.randomBytes(20).toString('hex'), [utils.signalhubUrl])
  var swarm1 = WebrtcSwarm(hub, {wrtc: wrtc})
  var swarm2 = WebrtcSwarm(hub, {wrtc: wrtc})

  swarm1.on('peer', function (peer) {
    peer.write('i am peer 1')

    peer.on('data', function (data) {
      t.same(data, Buffer('i am peer 2'), 'Peer1 receives message')
      t.end()
    })
  })
  swarm2.on('peer', function (peer) {
    peer.on('data', function (data) {
      t.same(data, Buffer('i am peer 1'), 'Peer2 receives message')
      peer.write('i am peer 2')
    })
  })
})
