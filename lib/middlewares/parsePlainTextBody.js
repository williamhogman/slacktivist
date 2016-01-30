module.exports = function * parsePlainTextBody(next) {
  const content = this.message && this.message.content
  // Run only if we haven't parsed the body
  if (!this.parsedBody && content && content.length) {
    this.parsedMessage = { text: content, wasRaw: true }
  }
  yield next
}
