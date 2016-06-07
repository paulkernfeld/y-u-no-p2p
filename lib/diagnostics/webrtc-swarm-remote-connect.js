var crypto = require('crypto')
var timers = require('timers')

var wrtc = require('electron-webrtc')()
var signalhub = require('signalhub')
var tape = require('tape')
var WebrtcSwarm = require('webrtc-swarm')

var utils = require('./../utils')

tape('Webrtc-swarm remote connect', function (t) {
  t.timeoutAfter(30000)
  t.on('end', function () {
    timers.setImmediate(process.exit)
  })

  var hub = signalhub('y-u-no-p2p', [utils.signalhubUrl])
  var swarm = WebrtcSwarm(hub, {wrtc: wrtc})

  var myString = crypto.randomBytes(20)
  var closing = false
  swarm.on('peer', function (peer) {
    t.pass('Found a peer')
    peer.write(Buffer.concat([Buffer([1]), myString]))

    peer.on('data', function (data) {
      t.pass('Got message from peer')
      if (data[0] === 0) {
        peer.write(data.slice(1))
      } else if (data[0] === 1) {
        t.same(data.slice(1), myString, 'Received back echoed string')

        if (!closing) {
          closing = true
          t.end()
          swarm.peers.forEach(function (peer) {
            peer.close()
          })
        }
      }
    })
  })
})
