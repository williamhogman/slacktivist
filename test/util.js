"use strict"

const assert = require("assert")
module.exports = {
  testMiddleware(fn, origCtx) {
    const ctx = Object.assign({}, origCtx),
          gen = fn.call(ctx)
    let done = false,
        val = null
    while(!done) {
      const nx = gen.next(val)
      done = nx.done
      val = nx.value
    }
    return ctx
  }
}
