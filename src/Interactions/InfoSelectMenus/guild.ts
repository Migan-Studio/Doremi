import { localizations, getInfo } from '@localizations'
import {
  type StringSelectMenuInteraction,
  codeBlock,
  time,
  GuildVerificationLevel,
  Locale,
  type APIEmbed,
} from 'discord.js'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    const value = `${time(
      Math.floor(interaction.guild!.createdTimestamp / 1000)
    )} (${time(Math.floor(interaction.guild!.createdTimestamp / 1000), 'R')})`
    const embed: APIEmbed = {
      timestamp: new Date().toISOString(),
      author: {
        name: interaction.user.tag,
        icon_url: interaction.user.displayAvatarURL(),
      },
      thumbnail: {
        url: interaction.guild!.iconURL()!,
      },
    }
    const locale = localizations(interaction.locale)
    const owner = interaction.client.users.cache.get(interaction.guild!.ownerId)
    let bot = 0
    let user = 0
    interaction.guild!.members.cache.forEach(member => {
      if (member.user.bot) bot++
      else user++
    })

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
    interaction.update({
      embeds: [
        {
          ...embed,
          title: locale.info.embeds.title.replace(
            '{name}',
            interaction.guild!.name
          ),
          description: codeBlock(
            'md',
            getInfo(interaction.locale).guild({
              name: interaction.guild!.name,
              owner: {
                name: owner!.tag,
                id: owner!.id,
              },
              count: {
                boost: interaction.guild!.premiumSubscriptionCount || 0,
                member: interaction.guild!.memberCount,
                bot: bot,
                memberOnly: user,
                emoji: interaction.guild!.emojis.cache.size,
                sticky: interaction.guild!.stickers.cache.size,
              },
              security: returnServerSecurity(),
            })
          ),
          fields: [
            {
              name: locale.info.embeds.fields.create_date.guild,
              value,
            },
          ],
        },
      ],
    })
  },
}
