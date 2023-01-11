import { korean, english } from '@localizations'
import {
  EmbedBuilder,
  codeBlock,
  StringSelectMenuInteraction,
  Locale,
} from 'discord.js'
import os from 'os'

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
            .setTitle(
              korean.info.embeds.title.replace(
                '{name}',
                interaction.client.user!.username
              )
            )
            .setDescription(
              codeBlock(
                'md',
                `# OS 정보
- ${os.platform} ${os.arch}

# 봇 개발자
- ${interaction.client.users.cache.get(process.env.OWNER_ID!)!.tag}

# Node.js 버전
- ${process.version}

# PID
- ${process.pid}

# 서버수
- ${interaction.client.guilds.cache.size}

# 유저수
- ${interaction.client.users.cache.size}

# 지연시간
- ${interaction.client.ws.ping}ms`
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
            .setTitle(
              english.info.embeds.title.replace(
                '{name}',
                interaction.client.user!.username
              )
            )
            .setDescription(
              codeBlock(
                'md',
                `# OS info
- ${os.platform} ${os.arch}

# developer 
- ${interaction.client.users.cache.get(process.env.OWNER_ID!)!.tag}

# Node.js version 
- ${process.version}

# PID
- ${process.pid}

# server count
- ${interaction.client.guilds.cache.size}

# user count 
- ${interaction.client.users.cache.size}

# ping
- ${interaction.client.ws.ping}ms`
              )
            ),
        ],
      })
    }
  },
}
