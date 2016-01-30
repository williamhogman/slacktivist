"use strict"

const Chat = require("./Chat.js"),
      defaultClient = require("./defaultClient.js")

module.exports = function setupClient(apiKey) {
  if(!apiKey) {
    throw new Error("API key is required")
  }
  return new Chat(defaultClient(apiKey))
}
