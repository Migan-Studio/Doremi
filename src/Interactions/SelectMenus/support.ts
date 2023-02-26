import { MessageComponent } from '@discommand/message-components'
import { Locale, type StringSelectMenuInteraction } from 'discord.js'
import { english, korean } from '@localizations'

export default class SupportSelectMenus extends MessageComponent {
  constructor() {
    super('Doremi-select$support')
  }
  execute(interaction: StringSelectMenuInteraction) {
    const category = interaction.values[0].replace('Doremi-support$', '')
    interaction.client.sendDeveloper({
      embeds: [
        {
          author: {
            name: `문의 발신자: ${interaction.user.tag} (${interaction.user.id})`,
            icon_url: interaction.user.displayAvatarURL(),
          },
          title: `${korean.support.name} ${category}`,
          description: interaction.client.supportText,
          timestamp: new Date().toISOString(),
        },
      ],
    })
    if (interaction.locale === Locale.Korean) {
      interaction.update({
        embeds: [
          {
            author: {
              name: interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL(),
            },
            title: korean.support.name,
            description: korean.support.embeds.end.description,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
    } else {
      interaction.update({
        embeds: [
          {
            author: {
              name: interaction.user.tag,
              icon_url: interaction.user.displayAvatarURL(),
            },
            title: english.support.name,
            description: english.support.embeds.end.description,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
    }
  }
}
