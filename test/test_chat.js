"use strict"
const assert = require("assert"),
      Chat = require("../lib/chat/Chat.js"),
      mockResponse = new Object(),
      mockError = new Object()

function createMockClient(api) {
  return { api }
}

describe("Chat", () => {
  const workingClient = createMockClient((_1, payload, cb) =>
                                         cb(null, payload))
  const brokenClient = createMockClient((_1, _2, cb) => {
    cb(mockError, null)
  })
  describe("#sendMessage(payload)", () => {
    it("handles happy-case correctly", (done) => {
      const chat = new Chat(workingClient)
      chat.sendMessage(mockResponse).then((r) => {
        assert.equal(mockResponse, r)
        done()
      })
    })
    it("handles errors correctly", (done) => {
      const chat = new Chat(brokenClient)
      chat.sendMessage(mockResponse).catch(r => {
        assert.equal(mockError, r)
        done()
      })
    })
  })
})
