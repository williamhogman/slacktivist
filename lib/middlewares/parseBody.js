const JSON_CONTENT_TYPE = "application/json"

// The parseBody middleware parses the body of the message on the
// queue and stores it in the context. It follows two rules: If the
// content-type is `application/json` then the body must be valid JSON
// or the module will fail.
function * parseBody(next) {
  const contentType = this.message.properties.ContentType
  if (contentType === JSON_CONTENT_TYPE) {
    // If JSON is explicitly declared errors should crash
    this.parsedMessage = JSON.parse(this.message.content)
  } else if (!contentType) {
    try {
      // If JSON is implied errors are OK
      this.parsedMessage = JSON.parse(this.message.content)
    } catch (SyntaxError) {
      this.parsedMessage = null
    }
  }
  yield next
}

module.exports = parseBody
