import { MessageComponent } from '@discommand/message-components'
import { type ButtonInteraction } from 'discord.js'
import { localizations } from '@localizations'

export default class BanYes extends MessageComponent {
  public constructor() {
    super('Doremi-ban$yes')
  }
  public execute(interaction: ButtonInteraction) {
    const member = interaction.client.banNkick.member
    const reason = interaction.client.banNkick.reason
    const locale = localizations(interaction.locale)

    try {
      member.ban({
        reason: reason || 'None',
      })
      interaction.update({
        embeds: [
          {
            title: locale.ban.name,
            description: locale.ban.embeds.success.replace(
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
            title: locale.ban.embeds.error,
            color: 0xff0000,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
    }
  }
}
