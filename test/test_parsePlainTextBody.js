"use strict"

const assert = require("assert"),
      parsePlainTextBody = require("../lib/middlewares/parsePlainTextBody.js"),
      util = require("./util.js"),
      existingMsg = new Object()

function parseBodyFn(origCtx) {
  return util.testMiddleware(parsePlainTextBody, origCtx)
}

describe("parsePlainTextBody", () => {
  it("It skips parsing if parsedMessage already exists", () => {
    const res = parseBodyFn({ parsedMessage: existingMsg })
    assert.equal(res.parsedMessage, existingMsg)
  })
  it("It skips parsing empty bodies", () => {
    const res = parseBodyFn({ message: { content: "" }})
    assert.equal(res.parsedMessage, null)
  })
  it("It parses plaintext messages", () => {
    const res = parseBodyFn({ message: { content: "test" }})
    assert.deepStrictEqual(res.parsedMessage, { text: "test", wasRaw: true })
  })
})
