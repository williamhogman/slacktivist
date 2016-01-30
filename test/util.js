const assert = require("assert")
module.exports = {
  testMiddleware(fn, origCtx) {
    const ctx = Object.assign({}, origCtx),
          gen = fn.call(ctx)
    while(!gen.next().done) { assert.ok(true) }
    return ctx
  }
}
