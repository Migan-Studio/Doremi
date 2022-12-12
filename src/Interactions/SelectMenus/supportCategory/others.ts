import { korean, englishUS } from '@localizations'
import { EmbedBuilder, Locale, StringSelectMenuInteraction } from 'discord.js'

export default {
  execute(interaction: StringSelectMenuInteraction, content: string) {
    if (interaction.locale === Locale.Korean) {
      interaction.client.SendDMWithDeveloperForEmbed(
        new EmbedBuilder()
          .setAuthor({
            name: `문의 발신자: ${interaction.user.tag} (${interaction.user.id})`,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(korean.support.name)
          .setDescription(
            korean.support.embeds.send.description('기타', content)
          )
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
          .setTitle(englishUS.support.name)
          .setDescription(
            englishUS.support.embeds.send.description('other', content)
          )
          .setTimestamp()
      )
      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(englishUS.support.name)
            .setDescription(englishUS.support.embeds.end.description),
        ],
        components: [],
      })
    }
  },
}
