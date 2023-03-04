import { type ModalSubmitInteraction, ComponentType } from 'discord.js'

export default {
  execute(interaction: ModalSubmitInteraction) {
    interaction.reply({
      embeds: [
        {
          title: '공지',
          description: '공지를 발송 할 언어를 골라주세요.',
          timestamp: new Date().toISOString(),
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              customId: 'Doremi-select$notice',
              type: ComponentType.StringSelect,
              options: [
                {
                  label: '한국어',
                  description: '한국어로 설정된 채널만 공지를 전송합니다.',
                  value: 'Doremi-notice$ko',
                },
                {
                  label: '영어',
                  description: '영어로 설정된 채널만 공지를 전송합니다.',
                  value: 'Doremi-notice$en',
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
