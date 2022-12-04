import { Command } from 'mbpr-rodule'
import {
  EmbedBuilder,
  ChatInputCommandInteraction,
  ApplicationCommandOptionData,
  GuildMember,
  ChannelType,
  PermissionsBitField,
  ApplicationCommandOptionType,
} from 'discord.js'

module.exports = class extends Command {
  name = '추방'
  description = '[멤버 추방하기 권한 필요] Doremi의 추방'
  options: ApplicationCommandOptionData[] = [
    {
      type: ApplicationCommandOptionType.User,
      name: '멤버',
      description: '추방할 멤버',
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: '사유',
      description: '차단 사유',
      required: false,
    },
  ]
  execute(interaction: ChatInputCommandInteraction) {
    let member = interaction.options.getMember('멤버') as GuildMember
    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: '❌ 개인 메세지에선 해당 명령어를 사용 할 수 없어요. :(',
        ephemeral: true,
      })
    if (
      !interaction
        .guild!.members!.cache!.get(interaction.user.id)!
        .permissions.has(PermissionsBitField.Flags.KickMembers)
    )
      return interaction.reply({
        content: '❌ `멤버 추방하기` 권한이 필요해요 :(',
        ephemeral: true,
      })
    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionsBitField.Flags.KickMembers
      )
    )
      return interaction.reply({
        content: '❌ 이 봇에 `멤버 추방하기` 권한이 필요해요 :(',
        ephemeral: true,
      })

    try {
      member.kick(interaction.options.getString('사유') || '없음')
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('추방')
            .setDescription(`멤버 ${member.user.tag}을/를 추방했어요.`)
            .setTimestamp(),
        ],
        ephemeral: true,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
