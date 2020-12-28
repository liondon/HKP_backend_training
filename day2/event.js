const events = require('events')

// create an EventEmitter object fro event handling
const eventEmitter = new events.EventEmitter()

// create an event handler
const eventHandler = () => {
  console.log('I hear a scream!')
}

// assign the event handler to an event
eventEmitter.on('scream', eventHandler)

// fire the 'scream' event
eventEmitter.emit('scream')
