import { Command } from 'mbpr-rodule'
import {
  ActionRowBuilder,
  type ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'

export = class extends Command {
  name = '지원답장'
  description = '[개발자 전용] Doremi의 지원답장'
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID)
      return interaction.reply({
        content: '❌ 해당 명령어는 개발자만 사용 가능해요. :(',
        ephemeral: true,
      })
    const modal = new ModalBuilder()
      .setTitle('지원답장')
      .setCustomId('Doremi-modal$support-reply')

    const replyByUserID = new TextInputBuilder()
      .setCustomId('Doremi-support-reply$id')
      .setLabel('답장 할 유저의 ID를 적어주세요.')
      .setStyle(TextInputStyle.Short)

    const replyText = new TextInputBuilder()
      .setCustomId('Doremi-support-reply$text')
      .setLabel('답장 할 내용을 적어주세요.')
      .setStyle(TextInputStyle.Paragraph)

    const ActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents([
      replyByUserID,
    ])
    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents([
      replyText,
    ])
    modal.addComponents([ActionRow, actionRow])
    interaction
      .showModal(modal)
      .catch(e =>
        console.log(
          e.rawError.errors.data.components[0].components[1]._errors[0]
        )
      )
  }
}
