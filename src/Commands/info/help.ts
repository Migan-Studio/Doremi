import { Command } from '../../Client'
import {
  Formatters,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js'

export = class extends Command {
  name = '도움말'
  description = 'Doremi의 도움말'

  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder().setTitle(
          `${interaction.client.user!.username}의 도움말`
        ).setDescription(`
            **참고. 이 봇은 [mbpr](https://github.com/Migan-Studio/mbpr)프로젝트를 기반하여 만들어 졌습니다.**
            ${Formatters.codeBlock(
              'md',
              `
# 정보
- 도움말
- 정보
- 핑
- 서버정보

# 관리
- 추방
- 차단
- 청소
- 차단해제`
            )}
          `),
      ],
    })
  }
}
