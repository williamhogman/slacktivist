module.exports = handler => function * interpretBody(next) {
  this.toSend = handler(this.parsedMessage)
  yield next
}
