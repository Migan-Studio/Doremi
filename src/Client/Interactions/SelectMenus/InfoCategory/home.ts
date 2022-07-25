import { EmbedBuilder, Formatters, SelectMenuInteraction } from 'discord.js'
import os from 'os'

export = {
  execute(interaction: SelectMenuInteraction) {
    interaction.update({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(`${interaction.client.user!.username} 정보`)
          .setDescription(
            Formatters.codeBlock(
              'md',
              `# OS 정보
- ${os.platform} ${os.arch}

# 봇 개발자
- ${interaction.client.users!.cache!.get(process.env.OWNER_ID!)!.tag}

# Node.js 버전
- ${process.version}

# PID
- ${process.pid}

# 서버수
- ${interaction.client.guilds.cache.size}

# 유저수
- ${interaction.client.users.cache.size}`
            )
          ),
      ],
    })
  },
}
