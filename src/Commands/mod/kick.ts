import { Command } from 'mbpr-rodule'
import {
  type ChatInputCommandInteraction,
  GuildMember,
  ChannelType,
  PermissionsBitField,
  ApplicationCommandOptionType,
  ComponentType,
  ButtonStyle,
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
    const locale = localizations(interaction.locale)

    if (member instanceof GuildMember) {
      interaction.client.banNkick = {
        member: member,
        reason: interaction.options.getString('reason'),
      }

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
              PermissionsBitField.Flags.KickMembers,
            )!,
            false,
          ),
          ephemeral: true,
        })
      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.KickMembers,
        )
      )
        return interaction.reply({
          content: ifNonePermissions(
            interaction.locale,
            getPermissions(
              interaction.locale,
              PermissionsBitField.Flags.KickMembers,
            )!,
            true,
          ),
          ephemeral: true,
        })

      if (!member.kickable)
        return interaction.reply({
          embeds: [
            {
              title: locale.kick.embeds.error,
              color: 0xff0000,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })

      interaction.reply({
        embeds: [
          {
            title: locale.kick.name,
            description: locale.kick.embeds.qustion.replace(
              '{member}',
              `\`${member.user.username}\``,
            ),
            timestamp: new Date().toISOString(),
          },
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                type: ComponentType.Button,
                label: locale.kick.components.yes,
                customId: 'Doremi-kick$yes',
                style: ButtonStyle.Success,
              },
              {
                type: ComponentType.Button,
                label: locale.kick.components.cancel,
                customId: 'Doremi-kick$cancel',
                style: ButtonStyle.Danger,
              },
            ],
          },
        ],
        ephemeral: true,
      })
    }
  }
}
