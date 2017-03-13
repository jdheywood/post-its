let WebSocket = window.WebSocket || window.MozWebSocket

exports.connect = function (server, user, notes) {
  if (!WebSocket) {
    console.log('Please use a newer browser to access collaboration features.')
  } else {
    // open connection
    let connection = new WebSocket(server)

    connection.onopen = function () {
      console.log('Connection to socket server opened.')
      // Send user, and any notes held locally so the socket server can store to distribute to future new connections
      connection.send(JSON.stringify(user))
      if (notes && notes.length > 0) {
        for (let index = 0; index < notes.length; index++) {
          connection.send(JSON.stringify(notes[index]))
        }
      }
    }

    connection.onerror = function (error) {
      console.log('Sorry, but there\'s a problem with your connection or the server is down.')
      console.log(error)
    }

    setInterval(function () {
      if (connection.readyState !== 1) {
        console.log('Unable to communicate with the WebSocket server.')
      }
    }, 3000)

    // TODO implement check on user last activity datetime, if >= timeout period remove from connected users in state
    setInterval(function () {
      console.log('Timing out users...')
    }, 30000)

    return connection
  }
}

exports.send = function (connection, message) {
  connection.send(message)
}

exports.disconnect = function (connection) {
  connection.close()
}
