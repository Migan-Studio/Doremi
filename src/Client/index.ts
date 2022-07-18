import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  Client,
  Collection,
  ChatInputCommandInteraction,
  GatewayIntentBits,
  InteractionType,
  PermissionResolvable,
  CacheType,
} from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'
import { config } from 'dotenv'

declare module 'discord.js' {
  interface Client {
    _commands: Collection<string, Command>
    _commandDirectory: string
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

export class mbprClient extends Client {
  constructor() {
    super({
      intents: [GatewayIntentBits.Guilds],
    })
    this._commands = new Collection()
    this._commandDirectory = path.join(__dirname, '..', 'Commands')
  }

  private _loadCommands() {
    const Directory = readdirSync(path.join(this._commandDirectory))
    for (const Folder of Directory) {
      const Dir2 = readdirSync(`${this._commandDirectory}/${Folder}`)
      for (const File of Dir2) {
        const Temp = require(`${this._commandDirectory}/${Folder}/${File}`)
        const modules: Command = new Temp()
        this._commands.set(modules.name, modules)
        this.once('ready', () => {
          this.application!.commands.create({
            name: modules.name,
            description: modules.description,
            // @ts-ignore
            type: modules.type,
            // @ts-ignore
            options: modules.options,
            defaultPermission: modules.defaultPermission,
          })
        })
      }
    }
  }

  start() {
    config()
    this.login(process.env.TOKEN)
    this.once('ready', () => {
      console.log(`[MbprClient] ${this.user!.username}`)
      console.log('-------------------------')
      console.warn('[Warning] You using preview version.')
    })
    this._loadCommands()
    this.on('interactionCreate', interaction => {
      if (interaction.type === InteractionType.ApplicationCommand) {
        const Command = this._commands.get(interaction.commandName)

        if (!Command) return

        Command.execute(interaction as ChatInputCommandInteraction<CacheType>)
      }
    })
  }
}
