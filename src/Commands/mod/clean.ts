import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from 'discord.js'
import { Command } from 'mbpr-rodule'

export = class extends Command {
  name = '채팅청소'
  description = '[메세지 관리하기 권한 필요] Doremi의 채팅청소'
  options: ApplicationCommandOptionData[] = [
    {
      type: ApplicationCommandOptionType.Number,
      name: '청소제한',
      description: '청소할 채팅의 갯수',
      required: true,
      minValue: 1,
      maxValue: 100,
    },
  ]

  async execute(interaction: ChatInputCommandInteraction) {
    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: '❌ 개인 메세지에선 해당 명령어를 사용 할 수 없어요. :(',
        ephemeral: true,
      })
    if (
      !interaction
        .guild!.members!.cache.get(interaction.user.id)!
        .permissions.has(
          PermissionsBitField.Flags.ManageMessages ||
            PermissionsBitField.Flags.Administrator
        )
    )
      return interaction.reply({
        content: '❌ `메세지 관리하기` 권한이 필요해요 :(',
        ephemeral: true,
      })
    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionsBitField.Flags.ManageMessages ||
          PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({
        content: '❌ 이 봇에 `메세지 관리하기` 권한이 필요해요 :(',
        ephemeral: true,
      })
    await interaction.channel?.messages
      .fetch({
        limit: interaction.options.getNumber('청소제한') as number,
      })
      .then(messages => {
        const channel = interaction.channel!
        if (channel.type !== ChannelType.GuildText) return
        channel.bulkDelete(messages, true)
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle('clean')
              .setDescription(
                `${interaction.options.getNumber(
                  '청소제한'
                )}개의 채팅을 청소 했어요.`
              ),
          ],
          ephemeral: true,
        })
      })
      .catch(error => console.log(error))
  }
}
