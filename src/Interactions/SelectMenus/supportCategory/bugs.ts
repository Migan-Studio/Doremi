import { EmbedBuilder, SelectMenuInteraction } from 'discord.js'

export default {
  execute(interaction: SelectMenuInteraction, content: string) {
    interaction.client.SendDMWithDeveloperForEmbed(
      new EmbedBuilder()
        .setAuthor({
          name: `문의 발신자: ${interaction.user.tag} (${interaction.user.id})`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .setTitle('지원')
        .setDescription(`버그 카테고리 \`${content}\``)
        .setTimestamp()
    )
    interaction.update({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle('지원')
          .setDescription('문의가 성공적으로 갔어요.'),
      ],
      components: [],
    })
  },
}
