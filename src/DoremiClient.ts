import {
  type APIEmbed,
  GatewayIntentBits,
  type MessageCreateOptions,
  type MessagePayload,
} from 'discord.js'
import {
  ComponentHandler,
  type MessageComponent,
} from '@discommand/message-components'
import { Mbpr } from 'mbpr-rodule'
import { join, dirname } from 'node:path'
import { readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export class DoremiClient extends Mbpr {
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
          command: join(__dirname, 'Commands'),
          listener: join(__dirname, 'Events'),
        },
      }
    )
  }

  public selectMenuHandler: ComponentHandler = new ComponentHandler(this, {
    directory: join(__dirname, 'Interactions', 'SelectMenus'),
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

  public sendDeveloper(
    options: string | MessagePayload | MessageCreateOptions
  ) {
    this.users.send(process.env.OWNER_ID!, options)
  }

  /**
   * @__PURE__
   * @deprecated use sendDeveloper
   * */
  public sendDMWithDeveloperForEmbed(embed: APIEmbed) {
    this.sendDeveloper({ embeds: [embed] })
  }
}

declare module 'discord.js' {
  interface Client {
    /**
     * @__PURE__
     * @deprecated use sendDeveloper
     * */
    sendDMWithDeveloperForEmbed(embed: APIEmbed): void
    sendDeveloper(options: string | MessagePayload | MessageCreateOptions): void
    supportText: string
    notice: {
      title: string
      content: string
    }
    selectMenuHandler: ComponentHandler
  }
}
