const assert = require("assert"),
      util = require("./util"),
      messageSender = require("../lib/middlewares/messageSender.js"),
      someMessage = { message: "foo" }

function messageSenderFn(toSend, res) {
  const ctx = {
    toSend,
    chat: { sendMessage() { return res } },
  }
  return util.testMiddleware(messageSender, ctx)
}

describe("messageSender", () => {
  describe("When no message to send", () => {
    it("throws an exception", () => {
      assert.throws(() => messageSenderFn(someMessage, null))
    })
  })
  describe("When sending a chat works", () => {
    const res = messageSenderFn({}, { ok: true })
    it("acks the message", () => assert(res.ack))
    it("doesn't nack the message", () => assert(!res.nack))
  })
  describe("When sending a chat fails", () => {
    const res = messageSenderFn({}, { ok: false })
    it("doesn't ack the message", () => assert(!res.ack))
    it("nacks the message", () => assert(res.nack))
  })
})
