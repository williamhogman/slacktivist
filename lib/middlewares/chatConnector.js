module.exports = (getChat) => function * chatConnector(next) {
  if (!this.app.context.$$slacktivistChat) {
    this.app.context.$$slacktivistChat = getChat()
  }
  this.chat = this.app.context.$$slacktivistChat
  yield next
}
