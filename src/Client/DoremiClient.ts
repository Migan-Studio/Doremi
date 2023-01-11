import { type APIEmbed, GatewayIntentBits } from 'discord.js'
import {
  ComponentHandler,
  type MessageComponent,
} from '@discommand/message-components'
import { Mbpr } from 'mbpr-rodule'
import { join } from 'path'
import { readdirSync } from 'fs'
require('dotenv/config')

export default class DoremiClient extends Mbpr {
  public constructor() {
    super(
      {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMembers,
          GatewayIntentBits.GuildPresences,
          GatewayIntentBits.GuildMessages,
        ],
      },
      {
        token: process.env.TOKEN!,
        defaultHelpCommand: false,
        directory: {
          command: join(__dirname, '..', 'Commands'),
          listener: join(__dirname, '..', 'Events'),
        },
      }
    )
  }

  public selectMenuHandler: ComponentHandler = new ComponentHandler(this, {
    directory: join(__dirname, '..', 'Interactions', 'SelectMenus'),
  })

  public async start() {
    super.start()
    const modules: MessageComponent[] = []

    for (const a of readdirSync(this.selectMenuHandler.options.directory)) {
      const tempModule = await import(
        `${this.selectMenuHandler.options.directory}/${a}`
      )
      if (!tempModule.default) {
        modules.push(new tempModule())
      } else {
        modules.push(new tempModule.default())
      }
    }

    this.selectMenuHandler.load(modules)
  }

  public sendDMWithDeveloperForEmbed(embed: APIEmbed) {
    this.users.cache.get(process.env.OWNER_ID!)!.send({ embeds: [embed] })
  }
}

declare module 'discord.js' {
  interface Client {
    sendDMWithDeveloperForEmbed(embed: APIEmbed): void
    supportText: string
    selectMenuHandler: ComponentHandler
  }
}
