import { korean, english } from '@localizations'
import {
  StringSelectMenuInteraction,
  EmbedBuilder,
  codeBlock,
  time,
  GuildVerificationLevel,
  Locale,
} from 'discord.js'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    function returnServerSecurity() {
      if (interaction.locale === Locale.Korean) {
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
      } else {
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
    }
    if (interaction.locale === Locale.Korean) {
      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(
              korean.info.embeds.title.replace('name', interaction.guild!.name)
            )
            .setThumbnail(interaction.guild!.iconURL())
            .setDescription(
              codeBlock(
                'md',
                `# 이름
${interaction.guild!.name}
  
# 소유자
${
  interaction.guild!.members.cache.get(interaction.guild!.ownerId)!.user.tag
} (${interaction.guild!.members.cache.get(interaction.guild!.ownerId)!.user.id})
  
# 부스트 갯수
${interaction.guild?.premiumSubscriptionCount || 0}

# security 
${returnServerSecurity()}

# 멤버  (봇 제외)
${interaction.guild!.memberCount}

# 이모지 수
${interaction.guild?.emojis.cache.size || 0}

# 스티커 수
${interaction.guild?.stickers.cache.size || 0}`
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
      interaction.update({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(
              english.info.embeds.title.replace(
                '{name}',
                interaction.guild!.name
              )
            )
            .setThumbnail(interaction.guild!.iconURL())
            .setDescription(
              codeBlock(
                'md',
                `# name
${interaction.guild!.name}
  
# owner 
${
  interaction.guild!.members.cache.get(interaction.guild!.ownerId)!.user.tag
} (${interaction.guild!.members.cache.get(interaction.guild!.ownerId)!.user.id})

# boost count
${interaction.guild?.premiumSubscriptionCount || 0}

# security 
${returnServerSecurity()}

# member count (bot include)
${interaction.guild!.memberCount}

# emoji count
${interaction.guild?.emojis.cache.size || 0}

# sticker count
${interaction.guild?.stickers.cache.size || 0}`
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
