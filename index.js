"use strict"

const setup = require("./lib")

module.exports = {
  setupDefaultExchange(app) {
    setup(app, "slacktivist")
  },
  setup,
}
