import { Command } from '../../Client'
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  codeBlock,
} from 'discord.js'

export = class extends Command {
  name = '도움말'
  description = 'Doremi의 도움말'

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${interaction.client.user!.username}의 도움말`)
          .setThumbnail(interaction.client.user!.displayAvatarURL())
          .setDescription(`
            **참고. 이 봇은 [mbpr](https://github.com/Migan-Studio/mbpr)프로젝트를 기반하여 만들어 졌습니다.**
            ${codeBlock(
              'md',
              `
# 정보
- 도움말
- 정보
- 지원

# 관리
- 추방
- 차단
- 채팅청소
- 차단해제`
            )}
          `),
      ],
    })
  }
}
