module.exports.destroySignalhub = function (hub) {
}

module.exports.closeWebrtcSwarm = function (swarm) {
  swarm.peers.forEach(function (peer) {
    peer.destroy()
  })
}

module.exports.signalhubUrl = 'https://exandria-signalhub.herokuapp.com/'
