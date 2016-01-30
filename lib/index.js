"use strict"

const setupChat = require("./chat"),
      JSON = "application/json"

function * parseBody(next) {
  const contentType = this.message.properties.ContentType
  if (contentType === JSON) {
    // If JSON is explicitly declared errors should crash
    this.parsedMessage = JSON.parse(this.message.content)
  } else if (!contentType) {
    try {
      // If JSON is implied errors are OK
      this.parsedMessage = JSON.parse(this.message.content)
    } catch (SyntaxError) {
      this.parsedMessage = null
    }
  }
  yield next
}

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

const interpretBody = (opts) => function * (next) {
  const chat = this.app.context.slacktivistChat,
        baseMessage = this.parsedMessage
          || (this.message.content.length ? { text: this.message.content, wasRaw: true } : null)
  const body = createBody(opts, baseMessage)
  this.toSend = body
  yield next
}

const createHandler = opts => function * handler() {
  if (!this.toSend) {
    throw new Error("Message sender expects toSend to not be null")
  }
  const chat = this.app.context.slacktivistChat,
        res = yield chat.sendMessage(this.toSend)
  console.log(res)

  this.ack = res.ok
  this.nack = !res.ok
}

function setup(app, queueName, opts) {
  if (!app.context.slacktivistChat) {
    app.context.slacktivistChat = setupChat("xoxb-19868100755-bmTJX8F6ToXfZut4T8DFmQrw")
  }
  app.queue(
    queueName,
    {},
    parseBody,
    interpretBody(opts),
    createHandler(opts)
  )
}

module.exports = setup
