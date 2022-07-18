import { Command } from '../../Client'
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
  name = 'kick'
  description = "mbpr project's Kick"
  options: ApplicationCommandOptionData[] = [
    {
      type: ApplicationCommandOptionType.User,
      name: 'member',
      description: 'member',
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: 'reason',
      description: 'kick reason',
      required: false,
    },
  ]
  execute(interaction: ChatInputCommandInteraction) {
    let member = interaction.options.getMember('member') as GuildMember
    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: "Can't Using the DM.",
        ephemeral: true,
      })
    if (
      !interaction
        .guild!.members!.cache!.get(interaction.user.id)!
        .permissions.has(PermissionsBitField.Flags.KickMembers)
    )
      return interaction.reply({
        content: 'You not have permissions has `Kick Members`.',
        ephemeral: true,
      })
    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionsBitField.Flags.KickMembers
      )
    )
      return interaction.reply({
        content: "i'm not have permissions has `Kick Members`.",
        ephemeral: true,
      })

    try {
      member.kick(interaction.options.getString('reason') || 'None')
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('Kick')
            .setDescription(`Member ${member.user.tag} has been kicked.`)
            .setTimestamp(),
        ],
        ephemeral: true,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
