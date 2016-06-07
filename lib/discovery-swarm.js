var DiscoverySwarm = require('discovery-swarm')

var runNode = function (swarmId, myString) {
  var swarm = DiscoverySwarm()

  swarm.listen()
  swarm.join(swarmId)

  swarm.on('connection', function (peer) {
    if (myString) {
      peer.write(Buffer.concat([Buffer([0]), myString]))
    }

    peer.on('data', function (data) {
      if (data[0] === 0) {
        peer.write(Buffer.concat([Buffer([1]), data.slice(1)]))
      }
      if (data[0] === 1) {
        if (myString && myString.equals(data.slice(1))) {
          swarm.emit('echo')
        }
      }
    })
  })

  return swarm
}

module.exports.runNode = runNode
