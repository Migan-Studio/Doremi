import { korean, english } from '@localizations'
import { EmbedBuilder, Locale, StringSelectMenuInteraction } from 'discord.js'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    if (interaction.locale === Locale.Korean) {
      interaction.client.SendDMWithDeveloperForEmbed(
        new EmbedBuilder()
          .setAuthor({
            name: `문의 발신자: ${interaction.user.tag} (${interaction.user.id})`,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(korean.support.name)
          .setDescription(`버그 카테고리 ${interaction.client.supportText}`)
          .setTimestamp()
      )
      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(korean.support.name)
            .setDescription(korean.support.embeds.end.description),
        ],
        components: [],
      })
    } else {
      interaction.client.SendDMWithDeveloperForEmbed(
        new EmbedBuilder()
          .setAuthor({
            name: `sender: ${interaction.user.tag} (${interaction.user.id})`,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(english.support.name)
          .setDescription(`bug category ${interaction.client.supportText}`)
          .setTimestamp()
      )
      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(english.support.name)
            .setDescription(english.support.embeds.end.description),
        ],
        components: [],
      })
    }
  },
}
