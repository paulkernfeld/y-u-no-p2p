#!/usr/bin/env node

var discoverySwarm = require('../lib/discovery-swarm')
var webrtc = require('../lib/webrtc')

discoverySwarm.runNode('y-u-no-p2p')
webrtc.runSwarmNode()
