import twilio from 'twilio'
require('dotenv').config()

const MessagingResponse = require('twilio').twiml.MessagingResponse

const BOT_NUMBER = 'whatsapp:+14155238886'

export const useWhatsappService = () => {
  const twilioSid: string = process.env.TWILIO_SID
  const twilioToken: string = process.env.TWILIO_SID

  // Twilio Client
  const twilioClient = twilio(twilioSid, twilioToken)

  function sendMessage(to: string, message: string) {
    twilioClient.messages.create({
      from: BOT_NUMBER,
      to: to,
      body: message
    })
  }

  function sendMediaMessage(to: string, message: string, mediaUrls: string[]) {
    twilioClient.messages.create({
      mediaUrl: mediaUrls,
      from: BOT_NUMBER,
      to: to,
      body: message
    })
  }

  function incomingMessageFromEndpoint(message: string) {
    const twiml = new MessagingResponse()
    return twiml.message(message).toString()
  }

  return {
    sendMessage,
    sendMediaMessage,
    incomingMessageFromEndpoint
  }
}
