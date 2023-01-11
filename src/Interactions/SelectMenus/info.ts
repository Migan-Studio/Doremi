import { MessageComponent } from '@discommand/message-components'
import { type StringSelectMenuInteraction } from 'discord.js'
import { InfoSelectMenu } from '@interactions'

export default class InfoSelectMenus extends MessageComponent {
  public constructor() {
    super('Doremi-select$info')
  }
  execute(interaction: StringSelectMenuInteraction) {
    new InfoSelectMenu().execute(interaction)
  }
}
