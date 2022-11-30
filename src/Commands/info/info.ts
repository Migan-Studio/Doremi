import { Command } from '../../Client'
import {
  ActionRowBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SelectMenuBuilder,
  ChannelType,
  codeBlock,
} from 'discord.js'
import os from 'os'

export = class extends Command {
  name = '정보'
  description = 'Doremi의 정보명령어'
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: '❌ 개인 메세지에선 해당 명령어를 사용 할 수 없어요. :(',
        ephemeral: true,
      })
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(`${interaction.client.user!.username} 정보`)
          .setDescription(
            codeBlock(
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
- ${interaction.client.users.cache.size}

# 지연시간
- ${interaction.client.ws.ping}ms`
            )
          ),
      ],
      components: [
        // @ts-ignore
        new ActionRowBuilder().addComponents(
          new SelectMenuBuilder().setCustomId('Doremi-select$info').setOptions([
            {
              label: '기본 정보',
              description: 'Doremi의 기본정보',
              value: 'Doremi-info$home',
            },
            {
              label: '서버 정보',
              description: 'Doremi가 속해 있는 서버정보',
              value: 'Doremi-info$guild',
            },
          ])
        ),
      ],
    })
  }
}
