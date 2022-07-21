import {
  ModalSubmitInteraction,
  EmbedBuilder,
  SelectMenuBuilder,
  ActionRowBuilder,
} from 'discord.js'

export default {
  execute(interaction: ModalSubmitInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle('지원')
          .setDescription('어느 항목으로 문의를 하실껀까요?'),
      ],
      components: [
        // @ts-ignore
        new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId('Doremi-select$support')
            .setOptions(
              {
                label: '버그',
                description:
                  'Doremi를 사용하면서 발생한 버그에 대해 문의하실 수 있어요.',
                value: 'Doremi-support$bug',
              },
              {
                label: '건의',
                description:
                  'Doremi를 사용하면서 불편했던 점이나 추가 되면 좋을 꺼 같은 기능을 문의하실 수 있어요.',
                value: 'Doremi-support$suggestion',
              },
              {
                label: '기타',
                description:
                  'Doremi를 사용하면서 궁금 했던 점을 문의하실 수 있어요.',
                value: 'Doremi-support$other',
              }
            )
        ),
      ],
      ephemeral: true,
    })
  },
}
