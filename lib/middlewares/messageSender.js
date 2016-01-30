 function * messageSender(next) {
  if (!this.toSend) {
    throw new Error("Message sender expects toSend to not be null")
  }
  const chat = this.app.context.slacktivistChat,
        res = yield chat.sendMessage(this.toSend)

  this.ack = res.ok
  this.nack = !res.ok
  yield next
}

module.exports = messageSender
