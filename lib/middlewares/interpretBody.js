function normalize(parsedMessage, message) {
  if (parsedMessage) {
    return parsedMessage
  } else if (message.content.length) {
    return { text: message.content, wasRaw: true }
  } else {
    return null
  }
}

module.exports = handler => function * interpretBody(next) {
  this.toSend = handler(normalize(this.parsedMessage, this.message))
  yield next
}
