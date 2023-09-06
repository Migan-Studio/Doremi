import { MessageComponent } from '@discommand/message-components'
import { localizations } from '@localizations'
import { type ButtonInteraction } from 'discord.js'

export default class BanCancel extends MessageComponent {
  public constructor() {
    super('Doremi-ban$cancel')
  }

  public execute(interaction: ButtonInteraction) {
    const locale = localizations(interaction.locale)

    interaction.update({
      embeds: [
        {
          title: locale.ban.name,
          description: locale.ban.embeds.cancel,
          color: 0xff0000,
          timestamp: new Date().toISOString(),
        },
      ],
      components: [],
    })
  }
}
