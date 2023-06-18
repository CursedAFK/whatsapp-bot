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

const insults = [
  'You play like a one-handed sloth on tranquilizers.',
  "Did you forget to turn on your brain's turbo mode?",
  'Your gaming skills are on par with a potato.',
  "I've seen rocks with quicker reflexes than you.",
  "You must have a PhD in camping because you're a master at staying in one spot.",
  'Are you using a controller or a microwave? Your movements are so slow.',
  "You're so bad, even the NPCs would laugh at you.",
  "Did you download your skills from a dial-up connection? It's like you're stuck in the '90s.",
  'I bet your mom beats you at this game.',
  "You're a walking respawn timer.",
  'Is your controller unplugged or are you just naturally terrible?',
  "You're the reason they put tutorials in games.",
  "I've seen toddlers with better hand-eye coordination than you.",
  'Do you even know how to aim, or are you just guessing?',
  "You're like a black hole for skill – everything around you gets sucked in.",
  'Are you trying to set a record for the most deaths in a single game?',
  "It's amazing how you manage to consistently make the wrong decisions.",
  "Even the AI thinks you're a joke.",
  "I've seen snails move faster than you.",
  "You're a walking, talking strategy guide for failure.",
  "I didn't know they made players as bad as you anymore.",
  'You should stick to playing games that require no skill. Like solitaire.',
  'Is your screen covered in Vaseline? Your aim is that blurry.',
  "You're the reason the mute button was invented.",
  "I'm surprised you can even find the power button on your console.",
  'Do you have a strategy, or are you just button mashing?',
  "If there was a competition for the most clueless player, you'd win first place.",
  "You're about as useful as a broken controller.",
  "I've seen bots with more personality than you.",
  "You're proof that natural selection doesn't apply to gamers.",
  "I hope you have a day job because gaming clearly isn't your forte.",
  "You're a prime example of what happens when a player has no talent or effort.",
  'Do you practice being terrible, or does it come naturally to you?',
  "I've heard of casual gamers, but you take it to a whole new level.",
  "It's impressive how you consistently find new ways to fail.",
  "You're the living embodiment of a respawn camper.",
  "Were you aiming for the floor? Because that's where your shots are going.",
  "I'd say you're a noob, but that would be an insult to actual noobs.",
  'Your kill-to-death ratio is a work of art. A really terrible art.',
  'Did you just rage quit in the middle of a sentence? Your comeback game is weak.',
  'You have the strategic sense of a blindfolded chicken.',
  'Your gaming skills are like a horror movie – they make me laugh and cringe at the same time.',
  "Even a laggy server can't be blamed for your lack of skill.",
  "You're like a broken record, repeating the same mistakes over and over.",
  "You're what happens when a player skips the tutorial and jumps straight into the game.",
  "I've seen NPCs with better decision-making skills than you.",
  'Are you using a steering wheel to play? Your movement is that uncoordinated.',
  "Your reaction time is so slow, it's like you're playing in slow motion.",
  "I thought I'd seen bad players before, but you've redefined the term.",
  "Do you need a walkthrough for this game? It seems like you're lost.",
  "You're the embodiment of every gamer stereotype, and not in a good way.",
  "You're the reason people mute their microphones in multiplayer games."
]

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

  if (message.body === '!roast') {
    client.sendMessage(insults[Math.floor(Math.random() * insults.length)])
  }
})
