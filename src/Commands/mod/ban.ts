import { Command } from 'mbpr-rodule'
import {
  ChannelType,
  type ChatInputCommandInteraction,
  GuildMember,
  ApplicationCommandOptionType,
  PermissionsBitField,
} from 'discord.js'
import {
  english,
  ifDM,
  ifNonePermissions,
  korean,
  localizations,
  getPermissions,
} from '@localizations'

export default class BanCommands extends Command {
  public constructor() {
    super({
      name: english.ban.name,
      nameLocalizations: { ko: korean.ban.name },
      description: english.ban.description,
      descriptionLocalizations: { ko: korean.ban.description },
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: english.ban.options.member.name,
          nameLocalizations: { ko: korean.ban.options.member.name },
          description: english.ban.options.member.description,
          descriptionLocalizations: {
            ko: korean.ban.options.member.description,
          },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: english.ban.options.reason.name,
          nameLocalizations: { ko: korean.ban.options.reason.name },
          description: english.ban.options.reason.description,
          descriptionLocalizations: {
            ko: korean.ban.options.reason.description,
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

    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: ifDM(interaction.locale),
        ephemeral: true,
      })

    if (member instanceof GuildMember) {
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
              PermissionsBitField.Flags.BanMembers
            )!,
            false
          ),
          ephemeral: true,
        })

      if (
        !interaction.guild!.members!.me!.permissions.has(
          PermissionsBitField.Flags.BanMembers
        )
      )
        return interaction.reply({
          content: ifNonePermissions(
            interaction.locale,
            getPermissions(
              interaction.locale,
              PermissionsBitField.Flags.BanMembers
            )!,
            true
          ),
          ephemeral: true,
        })

      if (!member.bannable)
        return interaction.reply({
          content: locale.ban.error,
          ephemeral: true,
        })

      try {
        member.ban({
          reason: reason || 'None',
        })
        interaction.reply({
          embeds: [
            {
              title: locale.ban.name,
              description: locale.ban.embeds.description.replace(
                '{member}',
                member.user.tag
              ),
              timestamp: new Date().toISOString(),
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
