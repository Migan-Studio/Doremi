import { english, korean } from '@localizations'
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
            .setTitle(
              korean.info.embeds.title.replace(
                '{name}',
                interaction.user.username
              )
            )
            .setDescription(
              codeBlock(
                'md',
                `# 이름
- ${interaction.user.username}

# 태그
- ${interaction.user.discriminator}

# 상태
- ${returnPresence()}

# bot 
- ${member.user.bot ? '봇이에요' : '봇이 아니에요'}

# nick 
- ${member.nickname || '없음'}`
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
            .setTitle(
              english.info.embeds.title.replace(
                '{name}',
                interaction.user.username
              )
            )
            .setDescription(
              codeBlock(
                'md',
                `# name 
- ${interaction.user.username}

# tag
- ${interaction.user.discriminator}

# presence
- ${member.presence!.status || 'None'}

# bot 
- ${member.user.bot ? 'Bot' : 'Not bot'}

# nick 
- ${member.nickname || 'None'}`
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
