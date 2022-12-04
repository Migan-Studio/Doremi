import { Mbpr } from 'mbpr-rodule'
import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  Collection,
  ChatInputCommandInteraction,
  GatewayIntentBits,
  InteractionType,
  PermissionResolvable,
  ActivityType,
} from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'
import { config } from 'dotenv'
import Modal from '../Interactions/Modals'
import SelectMenus from '@interactions/SelectMenus'
import { Koreanbots } from 'koreanbots'
import Dokdo from 'dokdo'

declare module 'discord.js' {
  interface Client {
    SendDMWithDeveloperForEmbed(embed: any): void
    supportText: string
    dokdo: Dokdo
  }
}

export abstract class Command {
  name: string
  description: string
  defaultPermission?: PermissionResolvable
  type?: ApplicationCommandType
  options?: ApplicationCommandOptionData[]
  constructor() {
    this.name = ''
    this.description = ''
    this.defaultPermission = undefined
    this.type = ApplicationCommandType.ChatInput
  }

  execute(interaction: ChatInputCommandInteraction): void {}
}

export class DoremiClient extends Mbpr {
  constructor() {
    super(
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
        commandFolderLoadDir: path.join(__dirname, '..', 'Commands'),
      }
    )
  }

  public SendDMWithDeveloperForEmbed(embed: any) {
    this.users!.cache!.get(process.env.OWNER_ID!)!.send({
      embeds: [embed],
    })
  }

  public dokdo: Dokdo = new Dokdo(this, {
    prefix: 'drm!',
    aliases: ['dok', 'dokdo', 'eval'],
    noPerm: msg => {
      msg.reply({ content: '❌ 해당 명령어는 개발자 전용이에요.' })
    },
  })

  public supportText = ''

  // start() {
  //   process.on('uncaughtException', console.error)

  //   config()
  //   this.login(process.env.TOKEN)
  //   this.once('ready', () => {
  //     if (!process.env.KRBOTS_TOKEN) {
  //       return console.info(
  //         '[MbprClient>KoreanBots] KoreanBots Token is undefined. Not define of koreanbots variable.'
  //       )
  //     } else {
  //       const koreanbots = new Koreanbots({
  //         api: {
  //           token: process.env.KRBOTS_TOKEN,
  //         },
  //         clientID: this.user!.id,
  //       })
  //       const update = () =>
  //         koreanbots.mybot
  //           .update({
  //             servers: this.guilds.cache.size,
  //           })
  //           .then(res =>
  //             console.info(
  //               `[MbprClient<KoreanBots>] Response: ${JSON.stringify(res)}`
  //             )
  //           )
  //       update()
  // start() {
  //   process.on('uncaughtException', console.error)
  //   config()
  //   this.login(process.env.TOKEN)
  //   this.once('ready', () => {
  //     if (!process.env.KRBOTS_TOKEN) {
  //       return console.info(
  //         '[MbprClient>KoreanBots] KoreanBots Token is undefined. Not define of koreanbots variable.'
  //       )
  //     } else {
  //       const koreanbots = new Koreanbots({
  //         api: {
  //           token: process.env.KRBOTS_TOKEN,
  //         },
  //         clientID: this.user!.id,
  //       })
  //       const update = () =>
  //         koreanbots.mybot
  //           .update({
  //             servers: this.guilds.cache.size,
  //           })
  //           .then(res =>
  //             console.info(
  //               `[MbprClient<KoreanBots>] Response: ${JSON.stringify(res)}`
  //             )
  //           )
  //       update()
  //       setInterval(update, 600000)
  //     }
  //     console.log(`[MbprClient] ${this.user!.username}`)
  //     console.log('-------------------------')
  //     const changeStatus = () =>
  //       this.user!.setActivity({
  //         name: '/도움말',
  //         type: ActivityType.Listening,
  //       })
  //     setInterval(changeStatus, 10000)
  //   })
  //   this.on('interactionCreate', interaction => {
  //     if (interaction.type === InteractionType.ApplicationCommand) {
  //       if (!interaction.isChatInputCommand()) return
  //       const Command = this._commands.get(interaction.commandName)
  //       if (!Command) return
  //       Command.execute(interaction)
  //     }
  //   })
  //     .on('interactionCreate', async interaction => {
  //       if (interaction.type === InteractionType.ModalSubmit) {
  //         // @ts-ignore
  //         Modal[interaction.customId].default.execute(interaction)
  //       } else if (interaction.type === InteractionType.MessageComponent) {
  //         if (!interaction.isSelectMenu()) return
  //         if (interaction.customId.startsWith('Doremi-select$support')) {
  //           // @ts-ignore
  //           SelectMenus[interaction.customId].default.execute(
  //             interaction,
  //             this.supportText
  //           )
  //         } else {
  //           // @ts-ignore
  //           SelectMenus[interaction.customId].default.execute(
  //             interaction,
  //             interaction.user.id
  //           )
  //         }
  //       }
  //     })
  //     .on('messageCreate', msg => {
  //       this.dokdo.run(msg)
  //     })
  // }
  //       this.user!.setActivity({
  //         name: '/도움말',
  //         type: ActivityType.Listening,
  //       })
  //     setInterval(changeStatus, 10000)
  //   })
  //   this.on('interactionCreate', interaction => {
  //     if (interaction.type === InteractionType.ApplicationCommand) {
  //       if (!interaction.isChatInputCommand()) return
  //       const Command = this._commands.get(interaction.commandName)

  //       if (!Command) return

  //       Command.execute(interaction)
  //     }
  //   })
  //     .on('interactionCreate', async interaction => {
  //       if (interaction.type === InteractionType.ModalSubmit) {
  //         // @ts-ignore
  //         Modal[interaction.customId].default.execute(interaction)
  //       } else if (interaction.type === InteractionType.MessageComponent) {
  //         if (!interaction.isSelectMenu()) return
  //         if (interaction.customId.startsWith('Doremi-select$support')) {
  //           // @ts-ignore
  //           SelectMenus[interaction.customId].default.execute(
  //             interaction,
  //             this.supportText
  //           )
  //         } else {
  //           // @ts-ignore
  //           SelectMenus[interaction.customId].default.execute(
  //             interaction,
  //             interaction.user.id
  //           )
  //         }
  //       }
  //     })
  //     .on('messageCreate', msg => {
  //       this.dokdo.run(msg)
  //     })
  // }
}
