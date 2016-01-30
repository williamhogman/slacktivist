"use strict"

const Slack = require("slack-node")


module.exports = function defaultClient(apiKey) {
  return new Slack(apiKey)
}
