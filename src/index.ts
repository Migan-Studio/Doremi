/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ActivityType,
  type APIEmbed,
  type EmbedBuilder,
  GatewayIntentBits,
  InteractionType,
} from 'discord.js'
import { Mbpr } from 'mbpr-rodule'
import path from 'path'
import Dokdo from 'dokdo'
import SelectMenus from '@interactions/SelectMenus'
import Modal from '@interactions/Modals'
import { koreanbots } from 'koreanbots-lite'
import chalk from 'mbpr-rodule'
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
      command: path.join(__dirname, 'Commands'),
    },
  }
)

const dokdo = new Dokdo(client, {
  prefix: `drm!`,
  aliases: ['dok', 'dokdo', 'eval'],
  noPerm: msg => {
    msg.reply({ content: '❌ This command is developer only.' })
  },
  owners: [process.env.OWNER_ID!],
})

client
  .once('ready', () => {
    if (!process.env.KRBOTS_TOKEN) {
      return client.loger.sendConsoleMessage(
        `KoreanBots Token is ${chalk.red(
          'undefined'
        )}. Not define of koreanbots variable.`
      )
    } else {
      const update = () =>
        koreanbots({
          token: process.env.TOKEN!,
          id: client.user!.id,
          servers: client.guilds.cache.size,
        }).then(async response =>
          client.loger.sendConsoleMessage(await response.body.json())
        )

      setInterval(update, 600000)
    }

    const changeStatus = () =>
      client.user!.setActivity({
        name: '/help | /도움말',
        type: ActivityType.Listening,
      })
    changeStatus()
    setInterval(changeStatus, 10000)
  })
  .on('interactionCreate', async interaction => {
    if (interaction.type === InteractionType.ModalSubmit) {
      // @ts-ignore
      Modal[interaction.customId].default.execute(interaction)

      client.supportText = interaction.fields.getTextInputValue(
        'Doremi-support$text'
      )
    } else if (interaction.type === InteractionType.MessageComponent) {
      if (!interaction.isStringSelectMenu()) return
      // @ts-ignore
      SelectMenus[interaction.customId].default.execute(interaction)
    }
  })
  .on('messageCreate', msg => {
    if (msg.author.bot) return
    dokdo.run(msg)
  }).SendDMWithDeveloperForEmbed = (embed: APIEmbed | EmbedBuilder) => {
  client.users!.cache!.get(process.env.OWNER_ID!)!.send({
    embeds: [embed],
  })
}

client.start()
