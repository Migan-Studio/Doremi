import { MessageComponent } from '@discommand/message-components'
import { type ButtonInteraction } from 'discord.js'
import { localizations } from '@localizations'

export default class KickYes extends MessageComponent {
  public constructor() {
    super('Doremi-kick$yes')
  }
  public execute(interaction: ButtonInteraction) {
    const member = interaction.client.banNkick.member
    const reason = interaction.client.banNkick.reason
    const locale = localizations(interaction.locale)

    try {
      member.kick(reason || 'None')
      interaction.update({
        embeds: [
          {
            title: locale.kick.name,
            description: locale.kick.embeds.success.replace(
              '{member}',
              member.user.tag,
            ),
            timestamp: new Date().toISOString(),
            color: 0x00ff00,
          },
        ],
        components: [],
      })
    } catch (error) {
      console.error(error)
      interaction.update({
        embeds: [
          {
            title: locale.kick.embeds.error,
            color: 0xff0000,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
    }
  }
}
