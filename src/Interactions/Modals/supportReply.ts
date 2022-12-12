import { ModalSubmitInteraction, EmbedBuilder } from 'discord.js'

export default {
  execute(interaction: ModalSubmitInteraction) {
    const replyText = interaction.fields.getTextInputValue(
      'Doremi-support-reply$text'
    )
    const replyByUserID = interaction.fields.getTextInputValue(
      'Doremi-support-reply$id'
    )

    const replyMember = interaction.client.users.cache.get(replyByUserID)

    if (!replyMember) return

    replyMember.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: `답변자: ${interaction.user.tag}`,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle('지원')
          .setDescription(
            `지원 내용에 대해 답장이 왔어요.\n답장 내용: \`${replyText}\``
          )
          .setTimestamp(),
      ],
    })

    interaction.reply({
      content: '답장 내용이 성공적으로 갔어요. :)',
      ephemeral: true,
    })
  },
}
