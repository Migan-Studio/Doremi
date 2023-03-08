import {
  GatewayIntentBits,
  type MessageCreateOptions,
  type MessagePayload,
  type Snowflake,
} from 'discord.js'
import { ComponentHandler } from '@discommand/message-components'
import { Mbpr } from 'mbpr-rodule'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { prerelease } from 'semver'
import { version } from '../package.json'
import { execSync } from 'node:child_process'
import 'dotenv/config'

function getVersion() {
  const commit = execSync('git rev-parse --short HEAD').toString()
  if (prerelease(version)) return `${version}.${commit}`
  else return `${version}-${commit}`
}

const __dirname = dirname(fileURLToPath(import.meta.url))

export class DoremiClient extends Mbpr {
  public readonly selectMenuHandler: ComponentHandler = new ComponentHandler(
    this,
    {
      directory: join(__dirname, 'Interactions', 'SelectMenus'),
    }
  )
  public readonly version = getVersion()
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

  public async start() {
    super.start()
    await this.selectMenuHandler.loadAll()
  }

  public sendDeveloper(
    options: string | MessagePayload | MessageCreateOptions
  ) {
    this.users.send(process.env.OWNER_ID!, options)
  }
}

declare module 'discord.js' {
  interface Client {
    sendDeveloper(options: string | MessagePayload | MessageCreateOptions): void
    supportText: string
    notice: {
      title: string
      content: string
    }
    supportReply: {
      id: Snowflake
      text: string
    }
    readonly selectMenuHandler: ComponentHandler
    readonly version: string
  }
}
