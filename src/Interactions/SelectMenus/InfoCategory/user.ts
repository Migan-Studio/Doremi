import { englishUS, korean } from '@localizations'
import {
  codeBlock,
  EmbedBuilder,
  Locale,
  StringSelectMenuInteraction,
  time,
} from 'discord.js'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    const member = interaction.guild!.members.cache.get(interaction.user.id)!
    const embed = new EmbedBuilder()
      .setTimestamp()
      .setThumbnail(member.user.displayAvatarURL())
    if (interaction.locale === Locale.Korean) {
      function returnPresence() {
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
      }
      interaction.update({
        embeds: [
          embed
            .setTitle(korean.info.embeds.user.title(member.user.username))
            .setDescription(
              codeBlock(
                'md',
                korean.info.embeds.user.description({
                  userName: member.user.username,
                  discriminator: member.user.discriminator,
                  presence: returnPresence()!,
                  isBot: member.user.bot ? '봇' : '봇아님',
                  nickname: member.nickname || '없음',
                })
              )
            )
            .setFields([
              {
                name: '계정 생성일',
                value: `${time(
                  Math.floor(member.user.createdTimestamp / 1000)
                )} (${time(
                  Math.floor(member.user.createdTimestamp / 1000),
                  'R'
                )})`,
              },
              {
                name: '서버 입장일',
                value: `${time(
                  Math.floor(member.joinedTimestamp! / 1000)
                )} (${time(Math.floor(member.joinedTimestamp! / 1000), 'R')})`,
              },
            ]),
        ],
      })
    } else {
      interaction.update({
        embeds: [
          embed
            .setTitle(englishUS.info.embeds.user.title(member.user.username))
            .setDescription(
              codeBlock(
                'md',
                englishUS.info.embeds.user.description({
                  userName: member.user.username,
                  discriminator: member.user.discriminator,
                  presence: member.presence!.status || 'None',
                  isBot: member.user.bot ? 'bot' : 'not bot',
                  nickname: member.nickname || 'None',
                })
              )
            )
            .setFields([
              {
                name: 'Account Creation Date',
                value: `${time(
                  Math.floor(member.user.createdTimestamp / 1000)
                )} (${time(
                  Math.floor(member.user.createdTimestamp / 1000),
                  'R'
                )})`,
              },
              {
                name: 'Server Join Date',
                value: `${time(
                  Math.floor(member.joinedTimestamp! / 1000)
                )} (${time(Math.floor(member.joinedTimestamp! / 1000), 'R')})`,
              },
            ]),
        ],
      })
    }
  },
}
