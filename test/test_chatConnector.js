const assert = require("assert"),
      chatConnector = require("../lib/middlewares/chatConnector"),
      util = require("./util.js"),
      clientMock = new Object()

function chatConnectorFn(chatObj, origCtx) {
  return util.testMiddleware(chatConnector(() => chatObj), origCtx)
}

describe("chatConnector", () => {
  describe("when a chat client hasn't been created", () => {
    const c = chatConnectorFn(clientMock, {
      app: { context: {} },
      chat: null
    })
    it("creates chat client in app context", () => {
      const appChat = c.app.context.$$slacktivistChat
      assert.strictEqual(clientMock, appChat)
    })
    it("assigns a chat client in the request", () => {
      assert.strictEqual(clientMock, c.chat)
    })
  })
  describe("When a chat client already exists", () => {
    const c = chatConnectorFn(clientMock, {
      app: { context: { $$slacktivistChat: clientMock } },
      chat: null
    })
    it("assigns a chat client in the request", () => {
      assert.strictEqual(clientMock, c.chat)
    })
    it("persists existing client side", () => {
      assert.strictEqual(clientMock, c.chat)
    })
  })
})
