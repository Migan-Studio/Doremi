import { Command } from 'mbpr-rodule'
import {
  type ChatInputCommandInteraction,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'

export default class NoticeCommands extends Command {
  public constructor() {
    super('공지')
    this.data = {
      name: '공지',
      description: '[개발자 전용] Doremi의 공지',
    }
  }
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID)
      return interaction.reply({
        content: '❌ 해당 명령어는 개발자만 사용 가능해요. :(',
        ephemeral: true,
      })

    const modal = new ModalBuilder()
      .setCustomId('Doremi-modal$notice')
      .setTitle('공지 내용')

    const noticeTitle = new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId('Doremi-notice$title')
        .setLabel('공지의 제목')
        .setStyle(TextInputStyle.Short)
    )

    const noticeContent =
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('Doremi-notice$content')
          .setLabel('공지의 내용')
          .setStyle(TextInputStyle.Paragraph)
      )

    modal.addComponents([noticeTitle, noticeContent])
    interaction.showModal(modal)
  }
}
