const setup = require("../index.js").setup,
      coworkers = require("coworkers"),
      app = coworkers()

setup(app, "test", { "channel": "@will" })
app.on("error", (err, context) =>
       console.error(`${context.queueName} consumer error`, err))
app.connect()
