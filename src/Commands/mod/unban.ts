import { Command } from 'discommand'
import {
  ApplicationCommandOptionType,
  ChannelType,
  type ChatInputCommandInteraction,
  PermissionsBitField,
} from 'discord.js'
import {
  english,
  ifDM,
  ifNonePermissions,
  korean,
  getPermissions,
  localizations,
} from '@localizations'

export default class UnbanCommands extends Command {
  public constructor() {
    super({
      name: english.unban.name,
      nameLocalizations: { ko: korean.unban.name },
      description: english.unban.description,
      descriptionLocalizations: { ko: korean.unban.description },
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: english.unban.options.name,
          nameLocalizations: { ko: korean.unban.options.name },
          description: english.unban.options.description,
          descriptionLocalizations: { ko: korean.unban.options.name },
          required: true,
        },
      ],
    })
  }
  public execute(interaction: ChatInputCommandInteraction) {
    const locale = localizations(interaction.locale)
    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: ifDM(interaction.locale),
        ephemeral: true,
      })
    if (
      !interaction
        .guild!.members!.cache!.get(interaction.user.id)!
        .permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return interaction.reply({
        content: ifNonePermissions(
          interaction.locale,
          getPermissions(
            interaction.locale,
            PermissionsBitField.Flags.BanMembers,
          )!,
          false,
        ),
        ephemeral: true,
      })
    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionsBitField.Flags.BanMembers,
      )
    )
      return interaction.reply({
        content: ifNonePermissions(
          interaction.locale,
          getPermissions(
            interaction.locale,
            PermissionsBitField.Flags.BanMembers,
          )!,
          true,
        ),
        ephemeral: true,
      })
    if (isNaN(interaction.options.getString('id') as unknown as number))
      return interaction.reply({
        content: localizations(interaction.locale).unban.IDIsNaN,
        ephemeral: true,
      })
    interaction!
      .guild!.members.unban(interaction.options.getString('id')!)
      .then(() => {
        interaction.reply({
          embeds: [
            {
              title: locale.unban.name,
              description: locale.unban.embeds.description,
              timestamp: new Date().toISOString(),
            },
          ],
        })
      })
      .catch(error => {
        interaction.reply({
          content: locale.unban.error,
          ephemeral: true,
        })
        console.error(error)
      })
  }
}
