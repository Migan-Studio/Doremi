export * from './DoremiClient'

// declaration import
import type { ComponentHandler } from '@discommand/message-components'
import type { APIEmbed } from 'discord.js'

// declaration
declare module 'discord.js' {
  interface Client {
    sendDMWithDeveloperForEmbed(embed: APIEmbed): void
    supportText: string
    selectMenuHandler: ComponentHandler
  }
}
