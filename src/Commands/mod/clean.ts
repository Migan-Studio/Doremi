import {
  english,
  ifDM,
  ifNonePermissions,
  korean,
  getPermissions,
  localizations,
} from '@localizations'
import {
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  PermissionsBitField,
} from 'discord.js'
import { Command } from 'mbpr-rodule'

export default class extends Command {
  public constructor() {
    super({
      name: english.clean.name,
      nameLocalizations: { ko: korean.clean.name },
      description: english.clean.description,
      descriptionLocalizations: { ko: korean.clean.description },
      options: [
        {
          type: ApplicationCommandOptionType.Number,
          name: english.clean.options.name,
          nameLocalizations: { ko: korean.clean.options.name },
          description: english.clean.options.description,
          descriptionLocalizations: { ko: korean.clean.options.description },
          required: true,
          minValue: 1,
          maxValue: 100,
        },
      ],
    })
  }
  async execute(interaction: ChatInputCommandInteraction) {
    const cleanLimit = interaction.options.getNumber(
      english.clean.options.name,
      true
    )
    const locale = localizations(interaction.locale)

    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: ifDM(interaction.locale),
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
        content: ifNonePermissions(
          interaction.locale,
          getPermissions(
            interaction.locale,
            PermissionsBitField.Flags.ManageMessages
          )!,
          false
        ),
        ephemeral: true,
      })
    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionsBitField.Flags.ManageMessages ||
          PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({
        content: ifNonePermissions(
          interaction.locale,
          getPermissions(
            interaction.locale,
            PermissionsBitField.Flags.ManageMessages
          )!,
          true
        ),
        ephemeral: true,
      })
    await interaction.channel?.messages
      .fetch({
        limit: cleanLimit,
      })
      .then(messages => {
        const channel = interaction.channel!
        if (channel.type !== ChannelType.GuildText) return
        channel.bulkDelete(messages, true)
        interaction.reply({
          embeds: [
            {
              title: locale.clean.name,
              description: locale.clean.embeds.description.replace(
                '{count}',
                `${cleanLimit}`
              ),
            },
          ],
          ephemeral: true,
        })
      })
      .catch(error => console.log(error))
  }
}
