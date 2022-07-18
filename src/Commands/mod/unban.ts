import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from 'discord.js'
import { Command } from '../../Client'

module.exports = class extends Command {
  name = 'unban'
  description = "mbpr project's Unban."
  options: ApplicationCommandOptionData[] = [
    {
      type: ApplicationCommandOptionType.String,
      name: 'id',
      description: "The unban member's ID.",
      required: true,
    },
  ]

  execute(interaction: ChatInputCommandInteraction) {
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
      !interaction.guild!.members.me!.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    )
      return interaction.reply({
        content: "i'm not have permissions has `Ban Members`.",
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
              .setTitle('unban')
              .setDescription('The member has been unbaned.')
              .setTimestamp(),
          ],
        })
      })
      .catch(error => {
        interaction.reply({
          content: "I can't unban the member.",
          ephemeral: true,
        })
        console.log(error)
      })
  }
}
