import { korean, englishUS } from '@localizations'
import {
  EmbedBuilder,
  codeBlock,
  StringSelectMenuInteraction,
  Locale,
} from 'discord.js'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    if (interaction.locale === Locale.Korean) {
      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(korean.info.embeds.bot.title)
            .setDescription(
              codeBlock(
                'md',
                korean.info.embeds.bot.description({
                  developerTag: interaction.client.users.cache.get(
                    process.env.OWNER_ID!
                  )!.tag,
                  serverCount: interaction.client.guilds.cache.size,
                  userCount: interaction.client.users.cache.size,
                  wsPing: interaction.client.ws.ping,
                })
              )
            ),
        ],
      })
    } else {
      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(englishUS.info.embeds.bot.title)
            .setDescription(
              codeBlock(
                'md',
                englishUS.info.embeds.bot.description({
                  developerTag: interaction.client.users.cache.get(
                    process.env.OWNER_ID!
                  )!.tag,
                  serverCount: interaction.client.guilds.cache.size,
                  userCount: interaction.client.users.cache.size,
                  wsPing: interaction.client.ws.ping,
                })
              )
            ),
        ],
      })
    }
  },
}
