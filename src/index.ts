import { ActivityType, GatewayIntentBits, InteractionType } from 'discord.js'
import { Mbpr } from 'mbpr-rodule'
import path from 'path'
import { config } from 'dotenv'
import Dokdo from 'dokdo'
import SelectMenus from '@interactions/SelectMenus'
import Modal from '@interactions/Modals'
import { Koreanbots } from 'koreanbots'

config()

declare module 'discord.js' {
  interface Client {
    SendDMWithDeveloperForEmbed(embed: any): void
    supportText: string
    dokdo: Dokdo
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
    commandFolderLoadDir: path.join(__dirname, 'Commands'),
  }
)
client
  .once('ready', () => {
    if (!process.env.KRBOTS_TOKEN) {
      return console.info(
        '[MbprClient>KoreanBots] KoreanBots Token is undefined. Not define of koreanbots variable.'
      )
    } else {
      const koreanbots = new Koreanbots({
        api: {
          token: process.env.KRBOTS_TOKEN,
        },
        clientID: client.user!.id,
      })

      const update = () =>
        koreanbots.mybot
          .update({
            servers: client.guilds.cache.size,
          })
          .then(res =>
            client.loger.sendConsoleMessage(`Response: ${res.message}`)
          )
      update()
      setInterval(update, 600000)
      client.dokdo = new Dokdo(client, {
        prefix: `<@${client.user!.id}>`,
        aliases: ['dok', 'dokdo', 'eval'],
        noPerm: msg => {
          msg.reply({ content: '❌ 해당 명령어는 개발자 전용이에요.' })
        },
        owners: [process.env.OWNER_ID!],
      })
    }
    const changeStatus = () =>
      client.user!.setActivity({
        name: '/도움말',
        type: ActivityType.Listening,
      })
    setInterval(changeStatus, 10000)
  })
  .on('interactionCreate', async interaction => {
    if (interaction.type === InteractionType.ModalSubmit) {
      // @ts-ignore
      Modal[interaction.customId].default.execute(interaction)
    } else if (interaction.type === InteractionType.MessageComponent) {
      if (!interaction.isSelectMenu()) return
      if (interaction.customId.startsWith('Doremi-select$support')) {
        // @ts-ignore
        SelectMenus[interaction.customId].default.execute(
          interaction,
          client.supportText
        )
      } else {
        // @ts-ignore
        SelectMenus[interaction.customId].default.execute(
          interaction,
          interaction.user.id
        )
      }
    }
  })
  .on('messageCreate', msg => {
    if (msg.author.bot) return
    client.dokdo.run(msg)
  }).SendDMWithDeveloperForEmbed = (embed: any) => {
  client.users!.cache!.get(process.env.OWNER_ID!)!.send({
    embeds: [embed],
  })
}

client.start()
