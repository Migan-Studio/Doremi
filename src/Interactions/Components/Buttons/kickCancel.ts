import { MessageComponent } from '@discommand/message-components'
import { localizations } from '@localizations'
import { type ButtonInteraction } from 'discord.js'

export default class KickCancel extends MessageComponent {
  public constructor() {
    super('Doremi-kick$cancel')
  }

  public execute(interaction: ButtonInteraction) {
    const locale = localizations(interaction.locale)

    interaction.update({
      embeds: [
        {
          title: locale.kick.name,
          description: locale.kick.embeds.cancel,
          color: 0xff0000,
          timestamp: new Date().toISOString(),
        },
      ],
      components: [],
    })
  }
}
