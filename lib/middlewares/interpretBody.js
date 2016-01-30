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

function normalize(parsedMessage, message) {
  if (parsedMessage) {
    return parsedMessage
  } else if (message.content.length) {
    return { text: message.content, wasRaw: true }
  } else {
    return null
  }
}

function getBody(opts, parsedMessage, message) {
  return createBody(opts, normalize(parsedMessage, message))
}

module.exports = (opts) => function * interpretBody(next) {
  this.toSend = getBody(opts, this.parsedMessage, this.message)
  yield next
}
