const qrcode = require('qrcode-terminal')
const { Client, LocalAuth } = require('whatsapp-web.js')

const client = new Client({
  authStrategy: new LocalAuth()
})

client.on('qr', qr => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  console.log('Client is ready')
})

client.initialize()

client.on('message', async message => {
  console.log(message.body)

  if (message.body === '!tagall') {
    const chat = await message.getChat()

    if (chat.isGroup) {
      let text = ''

      const mentions = []

      for (const participant of chat.participants) {
        const contact = await client.getContactById(participant.id._serialized)

        mentions.push(contact)

        text += `@${participant.id.user}`
      }

      await chat.sendMessage(text, {
        mentions
      })
    }
  }
})

module.exports = async (req, res) => {
  res.json({ message: 'WhatsApp bot serverless function' })
}
