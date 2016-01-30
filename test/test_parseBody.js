"use strict"

const assert = require("assert"),
      parseBody = require("../lib/middlewares/parseBody.js"),
      util = require("./util.js"),
      test = { yep: true }

function createMessage(content, isJson) {
  return {
    content,
    properties: {
      ContentType: isJson ? "application/json" : null,
    }
  }
}

function parseBodyFn(origCtx) {
  return util.testMiddleware(parseBody, origCtx)
}

describe("parseBody", () => {
  it("Parses json by default", () => {
    const res = parseBodyFn({ message: createMessage(JSON.stringify(test), false) })
    assert.deepStrictEqual(res.parsedMessage, test)
  })
  it("Parses json by default", () => {
    const res = parseBodyFn({ message: createMessage("foo", false) })
    assert.equal(res.parsedMessage, null)
  })
  it("Parses JSON when explicit told", () => {
    const res = parseBodyFn({ message: createMessage(JSON.stringify(test), true)})
    assert.deepStrictEqual(res.parsedMessage, test)
  })
  it("Fails on invalid JSON", () => {
    let didFail = false
    assert.throws(() => parseBodyFn({ message: createMessage("foo", true)}))
  })
})
