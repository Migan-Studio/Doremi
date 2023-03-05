import { ComponentType, type ModalSubmitInteraction } from 'discord.js'

export default {
  execute(interaction: ModalSubmitInteraction) {
    if (
      !interaction.client.users.cache.get(
        interaction.fields.getTextInputValue('Doremi-supportReply$id')
      )
    )
      return interaction.reply({
        content: '해당 하는 유저가 없어요 :(',
        ephemeral: true,
      })
    interaction.reply({
      embeds: [
        {
          title: '지원답장',
          description: '답장을 보낼 언어를 선택해 주세요.',
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.StringSelect,
              customId: 'Doremi-select$supportReply',
              options: [
                {
                  label: '한국어',
                  description: '한국어로 답장합니다.',
                  value: 'Doremi-supportReply$ko',
                },
                {
                  label: '영어',
                  description: '영어로 답장합니다.',
                  value: 'Doremi-supportReply$en',
                },
              ],
            },
          ],
        },
      ],
      ephemeral: true,
    })
  },
}
