import { korean, englishUS } from '@localizations'
import {
  StringSelectMenuInteraction,
  EmbedBuilder,
  codeBlock,
  time,
  GuildVerificationLevel,
  Locale,
} from 'discord.js'

export = {
  execute(interaction: StringSelectMenuInteraction) {
    if (interaction.locale === Locale.Korean) {
      function returnServerSecurity() {
        switch (interaction.guild!.verificationLevel) {
          case GuildVerificationLevel.High:
            return '높음'
          case GuildVerificationLevel.Low:
            return '낮음'
          case GuildVerificationLevel.Medium:
            return '중간'
          case GuildVerificationLevel.None:
            return '없음'
          case GuildVerificationLevel.VeryHigh:
            return '매우 높음'
        }
      }

      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(korean.info.embeds.guild.title)
            .setThumbnail(interaction.guild!.iconURL())
            .setDescription(
              codeBlock(
                'md',
                korean.info.embeds.guild.description({
                  name: interaction.guild!.name!,
                  owner: {
                    tag: interaction.guild!.members.cache.get(
                      interaction.guild!.ownerId
                    )!.user.tag!,
                    id: interaction.guild!.ownerId!,
                  },
                  boosters: interaction.guild?.premiumSubscriptionCount || 0,
                  security: returnServerSecurity(),
                  memberCount: interaction.guild!.memberCount!,
                  emojis: interaction.guild?.emojis.cache.size || 0,
                  stickers: interaction.guild?.stickers.cache.size || 0,
                })
              )
            )
            .addFields([
              {
                name: '서버의 생성일',
                value: `${time(
                  Math.floor(interaction.guild!.createdTimestamp / 1000)
                )} (${time(
                  Math.floor(interaction.guild!.createdTimestamp / 1000),
                  'R'
                )})`,
              },
            ]),
        ],
      })
    } else {
      function returnServerSecurity() {
        switch (interaction.guild!.verificationLevel) {
          case GuildVerificationLevel.High:
            return 'High'
          case GuildVerificationLevel.Low:
            return 'Low'
          case GuildVerificationLevel.Medium:
            return 'Medium'
          case GuildVerificationLevel.None:
            return 'None'
          case GuildVerificationLevel.VeryHigh:
            return 'Very High'
        }
      }

      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(englishUS.info.embeds.guild.title)
            .setThumbnail(interaction.guild!.iconURL())
            .setDescription(
              codeBlock(
                'md',
                englishUS.info.embeds.guild.description({
                  name: interaction.guild!.name!,
                  owner: {
                    tag: interaction.guild!.members.cache.get(
                      interaction.guild!.ownerId
                    )!.user.tag!,
                    id: interaction.guild!.ownerId!,
                  },
                  boosters: interaction.guild?.premiumSubscriptionCount || 0,
                  security: returnServerSecurity(),
                  memberCount: interaction.guild!.memberCount!,
                  emojis: interaction.guild?.emojis.cache.size || 0,
                  stickers: interaction.guild?.stickers.cache.size || 0,
                })
              )
            )
            .addFields([
              {
                name: 'server create date',
                value: `${time(
                  Math.floor(interaction.guild!.createdTimestamp / 1000)
                )} (${time(
                  Math.floor(interaction.guild!.createdTimestamp / 1000),
                  'R'
                )})`,
              },
            ]),
        ],
      })
    }
  },
}
