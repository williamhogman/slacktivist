function createBody(opts, parsedMessage) {
  if (typeof opts.handler === "function") {
    return opts.handler(parsedMessage)
  }
  const resultBody = Object.assign({}, opts, parsedMessage)
  // Function templates can only be set properly in configuration.
  if (typeof opts.template === "function") {
    resultBody.message = opts.template(parsedMessage)
  } else if (typeof opts.template === "string") {
    // TODO: Template engine here
  }
  delete resultBody["template"]
  delete resultBody["wasRaw"]
  return resultBody
}

module.exports = (opts) => function * interpretBody(next) {
  const chat = this.app.context.slacktivistChat,
        baseMessage = this.parsedMessage
          || (this.message.content.length ? { text: this.message.content, wasRaw: true } : null)
  const body = createBody(opts, baseMessage)
  this.toSend = body
  yield next
}
