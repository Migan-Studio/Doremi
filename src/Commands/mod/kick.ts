import { Command } from 'mbpr-rodule'
import {
  ChatInputCommandInteraction,
  GuildMember,
  ChannelType,
  PermissionsBitField,
  ApplicationCommandOptionType,
} from 'discord.js'
import {
  english,
  ifDM,
  ifNonePermissions,
  korean,
  getPermissions,
  localizations,
} from '@localizations'

export default class KickCommands extends Command {
  constructor() {
    super({
      name: english.kick.name,
      nameLocalizations: { ko: korean.kick.name },
      description: english.kick.description,
      descriptionLocalizations: { ko: korean.kick.description },
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: english.kick.options.member.name,
          nameLocalizations: { ko: korean.kick.options.member.name },
          description: english.kick.options.member.description,
          descriptionLocalizations: {
            ko: korean.kick.options.member.description,
          },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: english.kick.options.reason.name,
          nameLocalizations: { ko: korean.kick.options.reason.name },
          description: english.kick.options.reason.description,
          descriptionLocalizations: {
            ko: korean.kick.options.reason.description,
          },
          required: false,
        },
      ],
    })
  }
  execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.options.getMember('member')
    const reason = interaction.options.getString('reason')
    const locale = localizations(interaction.locale)

    if (member instanceof GuildMember) {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(interaction.locale),
          ephemeral: true,
        })
      if (
        !interaction
          .guild!.members!.cache!.get(interaction.user.id)!
          .permissions.has(PermissionsBitField.Flags.KickMembers)
      )
        return interaction.reply({
          content: ifNonePermissions(
            interaction.locale,
            getPermissions(
              interaction.locale,
              PermissionsBitField.Flags.KickMembers
            )!,
            false
          ),
          ephemeral: true,
        })
      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.KickMembers
        )
      )
        return interaction.reply({
          content: ifNonePermissions(
            interaction.locale,
            getPermissions(
              interaction.locale,
              PermissionsBitField.Flags.KickMembers
            )!,
            true
          ),
          ephemeral: true,
        })

      if (!member.kickable)
        return interaction.reply({
          content: locale.kick.error,
          ephemeral: true,
        })

      try {
        member.kick(reason || 'None')
        interaction.reply({
          embeds: [
            {
              title: locale.kick.name,
              description: locale.kick.embeds.description.replace(
                '{member}',
                member.user.tag
              ),
            },
          ],
          ephemeral: true,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
