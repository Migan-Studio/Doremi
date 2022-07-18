import { Command } from '../../Client'
import {
  EmbedBuilder,
  ChannelType,
  ApplicationCommandOptionData,
  ChatInputCommandInteraction,
  GuildMember,
  ApplicationCommandOptionType,
  PermissionsBitField,
} from 'discord.js'

export = class extends Command {
  name = 'ban'
  description = "mbpr project's ban"
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
      description: 'ban reason',
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
        .permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return interaction.reply({
        content: 'You not have permissions has `Ban Members`.',
        ephemeral: true,
      })
    if (
      !interaction.guild!.members!.me!.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    )
      return interaction.reply({
        content: "i'm not have permissions has `Ban Members`.",
        ephemeral: true,
      })

    try {
      member.ban({
        reason: interaction.options.getString('reason') || 'None',
      })
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle('Ban')
            .setDescription(`Member ${member.user.tag} has been baned.`)
            .setTimestamp(),
        ],
        ephemeral: true,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
