import { korean, english } from '@localizations'
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
                  label: korean.support.components.bug.label,
                  description: korean.support.components.bug.description,
                  value: 'Doremi-support$bug',
                },
                {
                  label: korean.support.components.suggestions.label,
                  description:
                    korean.support.components.suggestions.description,
                  value: 'Doremi-support$suggestion',
                },
                {
                  label: korean.support.components.other.label,
                  description: korean.support.components.other.description,
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
            .setTitle(english.support.name)
            .setDescription(english.support.embeds.select.description)
            .setTimestamp(),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('Doremi-select$support')
              .setOptions(
                {
                  label: english.support.components.bug.label,
                  description: english.support.components.bug.description,
                  value: 'Doremi-support$bug',
                },
                {
                  label: english.support.components.suggestions.label,
                  description:
                    english.support.components.suggestions.description,
                  value: 'Doremi-support$suggestion',
                },
                {
                  label: english.support.components.other.label,
                  description: english.support.components.other.description,
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
