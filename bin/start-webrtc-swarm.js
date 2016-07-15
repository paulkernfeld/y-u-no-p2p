#!/usr/bin/env node

var webrtc = require('../lib/webrtc')

var swarm = webrtc.runSwarmNode()
swarm.on('echo', function () { console.log('echo') })
