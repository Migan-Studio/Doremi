import {
  GatewayIntentBits,
  type MessageCreateOptions,
  type MessagePayload,
  type Snowflake,
} from 'discord.js'
import { ComponentPlugin } from '@discommand/message-components'
import { DiscommandClient } from 'discommand'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { version } from '../package.json'
import { Logger } from '@migan-studio/logger'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export class DoremiClient extends DiscommandClient {
  get version() {
    return version
  }
  public readonly logger = new Logger({
    name: 'Doremi',
  })
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
        directory: {
          command: join(__dirname, 'Commands'),
          listener: join(__dirname, 'Events'),
        },
        plugins: [
          new ComponentPlugin({
            directory: join(__dirname, 'Interactions', 'Components'),
          }),
        ],
      },
    )
  }

  public sendDeveloper(
    options: string | MessagePayload | MessageCreateOptions,
  ) {
    this.users.send(process.env.OWNER_ID!, options)
  }

  public login(): Promise<string> {
    return super.login(process.env.TOKEN)
  }
}

declare module 'discord.js' {
  interface Client {
    sendDeveloper(options: string | MessagePayload | MessageCreateOptions): void
    readonly logger: Logger
    supportText: string
    notice: {
      title: string
      content: string
    }
    supportReply: {
      id: Snowflake
      text: string
    }
    readonly version: string
    banNkick: {
      member: GuildMember
      reason: string | null
    }
  }
}
