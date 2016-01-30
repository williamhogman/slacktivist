module.exports = opts => function messageBuilder(parsedMessage) {
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
