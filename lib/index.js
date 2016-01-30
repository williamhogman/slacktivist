"use strict"

const KEY = "xoxb-19868100755-bmTJX8F6ToXfZut4T8DFmQrw"

const setupChat = require("./chat"),
      interpretBody = require("./middlewares/interpretBody.js"),
      parseBody = require("./middlewares/parseBody.js"),
      parsePlainTextBody = require("./middlewares/parsePlainTextBody.js"),
      messageSender = require("./middlewares/messageSender.js"),
      chatConnector = require("./middlewares/chatConnector.js"),
      messageBuilder = require("./messageBuilder.js")

function setup(app, queueName, opts) {
  app.queue(
    queueName,
    {},
    chatConnector(() => setupChat(KEY)),
    parseBody,
    parsePlainTextBody,
    interpretBody(messageBuilder(opts)),
    messageSender
  )
}

module.exports = setup
