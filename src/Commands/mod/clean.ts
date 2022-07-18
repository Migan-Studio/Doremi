import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} from 'discord.js'
import { Command } from '../../Client'

export = class extends Command {
  name = 'clean'
  description = 'Clean the chat room.'
  options: ApplicationCommandOptionData[] = [
    {
      type: ApplicationCommandOptionType.Number,
      name: 'limit',
      description: 'limit',
      required: true,
      minValue: 1,
      maxValue: 100,
    },
  ]

  async execute(interaction: ChatInputCommandInteraction) {
    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: "Can't Using the DM.",
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
        content: 'You not have permissions has `Manage Messages`.',
        ephemeral: true,
      })
    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionsBitField.Flags.ManageMessages ||
          PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({
        content: "i'm not have permissions gas `Manage Messages`.",
        ephemeral: true,
      })
    await interaction.channel?.messages
      .fetch({
        limit: interaction.options.getNumber('limit') as number,
      })
      .then(messages => {
        interaction.guild?.channels.fetch(interaction.channelId).then(a => {
          // @ts-ignore
          a.bulkDelete(messages, true)
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle('clean')
                .setDescription(
                  `${interaction.options.getNumber(
                    'limit'
                  )} chat(s) have been deleted.`
                ),
            ],
            ephemeral: true,
          })
        })
      })
      .catch(error => console.log(error))
  }
}
