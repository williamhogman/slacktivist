"use strict"

const KEY = process.env["SLACKTIVIST_API_KEY"]

const setupChat = require("./chat"),
      callHandler = require("./middlewares/callHandler.js"),
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
    callHandler(messageBuilder(opts)),
    messageSender
  )
}

module.exports = setup
