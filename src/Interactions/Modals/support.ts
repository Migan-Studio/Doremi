import { korean, englishUS } from '@localizations'
import {
  ModalSubmitInteraction,
  EmbedBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  Locale,
} from 'discord.js'

export default {
  execute(interaction: ModalSubmitInteraction) {
    if (interaction.locale === Locale.Korean) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(korean.support.name)
            .setDescription(korean.support.embeds.select.description)
            .setTimestamp(),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('Doremi-select$support')
              .setOptions(
                {
                  label: korean.support.componets.bug.label,
                  description: korean.support.componets.bug.description,
                  value: 'Doremi-support$bug',
                },
                {
                  label: korean.support.componets.suggestions.label,
                  description: korean.support.componets.suggestions.description,
                  value: 'Doremi-support$suggestion',
                },
                {
                  label: korean.support.componets.other.label,
                  description: korean.support.componets.other.description,
                  value: 'Doremi-support$other',
                }
              )
          ),
        ],
        ephemeral: true,
      })
    } else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(englishUS.support.name)
            .setDescription(englishUS.support.embeds.select.description)
            .setTimestamp(),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('Doremi-select$support')
              .setOptions(
                {
                  label: englishUS.support.componets.bug.label,
                  description: englishUS.support.componets.bug.description,
                  value: 'Doremi-support$bug',
                },
                {
                  label: englishUS.support.componets.suggestions.label,
                  description:
                    englishUS.support.componets.suggestions.description,
                  value: 'Doremi-support$suggestion',
                },
                {
                  label: englishUS.support.componets.other.label,
                  description: englishUS.support.componets.other.description,
                  value: 'Doremi-support$other',
                }
              )
          ),
        ],
        ephemeral: true,
      })
    }
  },
}
