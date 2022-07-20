import {
  ApplicationCommandOptionData,
  ApplicationCommandType,
  Client,
  Collection,
  ChatInputCommandInteraction,
  GatewayIntentBits,
  InteractionType,
  PermissionResolvable,
} from 'discord.js'
import { readdirSync } from 'fs'
import path from 'path'
import { config } from 'dotenv'
import Modal from './Interactions/Modals'
import SelectMenus from './Interactions/SelectMenus'

declare module 'discord.js' {
  interface Client {
    _commands: Collection<string, Command>
    _commandDirectory: string
    SendDMWithDeveloperForEmbed(embed: any): void
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
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
      ],
    })
    this._commands = new Collection()
    this._commandDirectory = path.join(__dirname, '..', 'Commands')
  }

  SendDMWithDeveloperForEmbed(embed: any) {
    this.users!.cache!.get(process.env.OWNER_ID!)!.send({
      embeds: [embed],
    })
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
    let supportText: string

    config()
    this.login(process.env.TOKEN)
    this.once('ready', () => {
      console.log(`[MbprClient] ${this.user!.username}`)
      console.log('-------------------------')
    })
    this._loadCommands()
    this.on('interactionCreate', interaction => {
      if (interaction.type === InteractionType.ApplicationCommand) {
        if (!interaction.isChatInputCommand()) return
        const Command = this._commands.get(interaction.commandName)

        if (!Command) return

        Command.execute(interaction)
      }
    })
    this.on('interactionCreate', async interaction => {
      if (interaction.type === InteractionType.ModalSubmit) {
        supportText = interaction.fields.getTextInputValue(
          'Doremi-support$text'
        )
        // @ts-ignore
        Modal[interaction.customId].default.execute(interaction)
      } else if (interaction.type === InteractionType.MessageComponent) {
        if (!interaction.isSelectMenu()) return
        // @ts-ignore
        SelectMenus[interaction.customId].default.execute(
          interaction,
          supportText
        )
      }
    })
  }
}
