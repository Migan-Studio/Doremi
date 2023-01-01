import { type APIEmbed, type EmbedBuilder, GatewayIntentBits } from 'discord.js'
import { Mbpr } from 'mbpr-rodule'
import { join } from 'path'
import process from 'process'
require('dotenv/config')

declare module 'discord.js' {
  interface Client {
    SendDMWithDeveloperForEmbed(embed: APIEmbed | EmbedBuilder): void
    supportText: string
  }
}

const client = new Mbpr(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  },
  {
    token: process.env.TOKEN!,
    defaultHelpCommand: false,
    directory: {
      command: join(__dirname, 'Commands'),
      listener: join(__dirname, 'Events'),
    },
  }
)

client.SendDMWithDeveloperForEmbed = (embed: APIEmbed | EmbedBuilder) => {
  client.users!.cache!.get(process.env.OWNER_ID!)!.send({
    embeds: [embed],
  })
}

client.start()
