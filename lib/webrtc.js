var crypto = require('crypto')

var electronWebrtc = require('electron-webrtc')
var signalhub = require('signalhub')
var WebrtcSwarm = require('webrtc-swarm')

var utils = require('../lib/utils')

var wrtc
var getWrtc = function () {
  if (!wrtc) {
    wrtc = electronWebrtc()
  }
  return wrtc
}

var closeWrtc = function () {
  wrtc.close()
}

var runSwarmNode = function (swarmId) {
  var hub = signalhub(swarmId || 'y-u-no-p2p', [utils.signalhubUrl])
  var swarm = WebrtcSwarm(hub, {wrtc: getWrtc()})
  var myString = crypto.randomBytes(20)

  swarm.on('peer', function (peer) {
    // Send my string to each new peer
    peer.write(Buffer.concat([Buffer([0]), myString]))

    peer.on('data', function (data) {
      if (data[0] === 0) {
        // Echo back data that I receive
        peer.write(Buffer.concat([Buffer([1]), data.slice(1)]))
      }
      if (data[0] === 1) {
        // If I receive my own data back, emit an "echo" event
        if (myString.equals(data.slice(1))) {
          swarm.emit('echo')
        }
      }
    })
  })
  return swarm
}

module.exports.runSwarmNode = runSwarmNode
module.exports.closeWrtc = closeWrtc
