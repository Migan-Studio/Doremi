import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from 'discord.js'
import { Command } from '../../Client'

module.exports = class extends Command {
  name = '차단해제'
  description = '[멤버 차단하기 권한 필요] Doremi의 차단해제'
  options: ApplicationCommandOptionData[] = [
    {
      type: ApplicationCommandOptionType.String,
      name: '아이디',
      description: '차단해제할 멤버의 ID',
      required: true,
    },
  ]

  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: '❌ 개인 메세지에선 해당 명령어를 사용 할 수 없어요. :(',
        ephemeral: true,
      })
    if (
      !interaction
        .guild!.members!.cache!.get(interaction.user.id)!
        .permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return interaction.reply({
        content: '❌ `멤버 차단하기` 권한이 필요해요 :(',
        ephemeral: true,
      })
    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    )
      return interaction.reply({
        content: '❌ 이 봇에 `멤버 차단하기` 권한이 필요해요 :(',
        ephemeral: true,
      })
    if (isNaN(interaction.options.getString('id') as unknown as number))
      return interaction.reply({
        content: '`id` is String.',
        ephemeral: true,
      })
    interaction!
      .guild!.members.unban(interaction.options.getString('id')!)
      .then(() => {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle('차단해제')
              .setDescription('멤버를 차단해제 했어요.')
              .setTimestamp(),
          ],
        })
      })
      .catch(error => {
        interaction.reply({
          content: '차단해제가 불가능해요 :(',
          ephemeral: true,
        })
        console.log(error)
      })
  }
}
