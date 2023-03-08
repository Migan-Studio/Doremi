import { localizations, getInfo } from '@localizations'
import {
  type APIEmbed,
  codeBlock,
  Locale,
  type StringSelectMenuInteraction,
  time,
} from 'discord.js'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    const member = interaction.guild!.members.cache.get(interaction.user.id)!
    const embed: APIEmbed = {
      timestamp: new Date().toISOString(),
      thumbnail: {
        url: member.user.displayAvatarURL(),
      },
      author: {
        name: interaction.user.tag,
        icon_url: interaction.user.displayAvatarURL(),
      },
    }
    const locale = localizations(interaction.locale)

    function returnPresence() {
      if (interaction.locale === Locale.Korean) {
        if (!member.presence?.status) return '없음'
        switch (member.presence.status) {
          case 'online':
            return '온라인'
          case 'idle':
            return '자리 비움'
          case 'dnd':
            return '다른 용무 중'
          case 'offline':
            return '오프라인'
        }
      } else {
        if (!member.presence?.status) return 'None'
        else return member.presence.status
      }
    }

    function isBot() {
      if (interaction.locale === Locale.Korean)
        return member.user.bot ? '봇이 맞아요' : '봇이 아니에요'
      else return member.user.bot ? 'Bot' : 'Not bot'
    }

    interaction.update({
      embeds: [
        {
          ...embed,
          title: locale.info.embeds.title.replace(
            '{name}',
            interaction.user.username
          ),
          description: codeBlock(
            'md',
            getInfo(interaction.locale).user({
              name: member.user.username,
              tag: member.user.discriminator,
              status: returnPresence(),
              isBot: isBot(),
              nickname:
                member.nickname || locale.info.embeds.description.none_nickname,
            })
          ),
          fields: [
            {
              name: locale.info.embeds.fields.create_date.account,
              value: `${time(
                Math.floor(member.user.createdTimestamp / 1000)
              )} (${time(
                Math.floor(member.user.createdTimestamp / 1000),
                'R'
              )})`,
            },
            {
              name: locale.info.embeds.fields.join,
              value: `${time(
                Math.floor(member.joinedTimestamp! / 1000)
              )} (${time(Math.floor(member.joinedTimestamp! / 1000), 'R')})`,
            },
          ],
        },
      ],
    })
  },
}
