"use strict"

const setupChat = require("./chat"),
      interpretBody = require("./middlewares/interpretBody.js"),
      parseBody = require("./middlewares/parseBody.js"),
      messageSender = require("./middlewares/messageSender.js")

function setup(app, queueName, opts) {
  if (!app.context.slacktivistChat) {
    app.context.slacktivistChat = setupChat("xoxb-19868100755-bmTJX8F6ToXfZut4T8DFmQrw")
  }
  app.queue(
    queueName,
    {},
    parseBody,
    interpretBody(opts),
    messageSender
  )
}

module.exports = setup
