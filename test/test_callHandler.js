"use strict"

const assert = require("assert"),
      callHandler = require("../lib/middlewares/callHandler.js"),
      util = require("./util"),
      testObj = new Object()

function callHandlerFn(fn, ctx) {
  return util.testMiddleware(callHandler(fn), ctx)
}

describe("callHandler", () => {
  let handlerCalled = false
  const handler = (x) => {
    handlerCalled = true
    return x
  }
  const res = callHandlerFn(handler, { parsedMessage: testObj })
  it("calls its handler", () => assert(handlerCalled))
  it("sets its return value in toSend", () => assert.strictEqual(res.toSend, testObj))
})
