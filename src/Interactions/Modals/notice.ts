import {
  type ModalSubmitInteraction,
  EmbedBuilder,
  ChannelType,
} from 'discord.js'

export default {
  execute(interaction: ModalSubmitInteraction) {
    interaction.client.channels.cache.forEach(channel => {
      if (channel.type !== ChannelType.GuildText) return
      if (
        channel.topic?.includes(`${interaction.client.user?.username}-공지`) ||
        channel.topic?.includes(`${interaction.client.user?.username}-notice`)
      ) {
        channel.send({
          embeds: [
            new EmbedBuilder()
              .setAuthor({
                name: `공지 발송자: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
              })
              .setTitle(`${interaction.client.user!.username} 공지`)
              .setFields([
                {
                  name: interaction.fields.getTextInputValue(
                    'Doremi-notice$title'
                  ),
                  value: interaction.fields.getTextInputValue(
                    'Doremi-notice$content'
                  ),
                },
              ]),
          ],
        })
      }
    })
    interaction.reply({
      content: `공지\n제목: ${interaction.fields.getTextInputValue(
        'Doremi-notice$title'
      )}\n내용: ${interaction.fields.getTextInputValue(
        'Doremi-notice$content'
      )}\n을 발송했습니다.`,
      ephemeral: true,
    })
  },
}
