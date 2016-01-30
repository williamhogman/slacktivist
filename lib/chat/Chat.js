"use strict"

class Chat {
  constructor(client) {
    this.client = client
  }
  sendMessage(payload) {
    return new Promise((resolve, reject) => {
      this.client.api("chat.postMessage", payload, (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      })
    })
  }
}

module.exports = Chat
