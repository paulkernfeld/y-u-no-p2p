var wrtc = require('electron-webrtc')()
var signalhub = require('signalhub')
var WebrtcSwarm = require('webrtc-swarm')

var utils = require('../lib/utils')

var runSwarmNode = function () {
  var hub = signalhub('y-u-no-p2p', [utils.signalhubUrl])
  var swarm = WebrtcSwarm(hub, {wrtc: wrtc})

  swarm.on('peer', function (peer) {
    peer.on('data', function (data) {
      if (data[0] === 0) {
        peer.write(Buffer.concat([1], data.slice(1)))
      }
    })
  })
}

module.exports.runSwarmNode = runSwarmNode
