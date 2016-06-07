var https = require('https')
var net = require('net')

var tape = require('tape')

var utils = require('../utils')

tape('Connect to signalhub', function (t) {
  https.get(utils.signalhubUrl, function (response) {
    t.ok(response, 'Got response')
    t.end()
  }).on('error', t.fail)
})

tape('Server listen on random port', function (t) {
  t.timeoutAfter(1000)

  var server = net.createServer(function (socket) {
    socket.on('data', function (data) {
      t.same(data, Buffer('i am client'), 'Client sends message')
      socket.write('i am server')
    })
  })
  t.pass('Create server')
  server.on('error', t.fail)

  server.listen(function () {
    t.pass('Server listen')

    var client = net.createConnection(server.address(), function () {
      t.pass('Create connection')

      client.on('error', t.fail)
      client.write('i am client')
      client.on('data', function (data) {
        t.same(data, Buffer('i am server'), 'Server sends message')
        client.end()
        server.close(t.end)
      })
    })
  })
})
