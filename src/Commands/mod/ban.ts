import { Command } from 'discommand'
import {
  ChannelType,
  type ChatInputCommandInteraction,
  GuildMember,
  ApplicationCommandOptionType,
  PermissionsBitField,
  ComponentType,
  ButtonStyle,
} from 'discord.js'
import {
  english,
  ifDM,
  ifNonePermissions,
  korean,
  localizations,
  getPermissions,
} from '@localizations'
import { banMember } from '@interactions'

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
  public async execute(interaction: ChatInputCommandInteraction) {
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
              PermissionsBitField.Flags.BanMembers,
            )!,
            false,
          ),
          ephemeral: true,
        })

      if (
        !interaction.guild!.members!.me!.permissions.has(
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

      if (!member.bannable)
        return interaction.reply({
          embeds: [
            {
              title: locale.ban.embeds.error,
              color: 0xff0000,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })

      const response = await interaction.reply({
        embeds: [
          {
            title: locale.ban.name,
            description: locale.ban.embeds.qustion.replace(
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
                label: locale.ban.components.yes,
                customId: 'Doremi-ban$yes',
                style: ButtonStyle.Success,
              },
              {
                type: ComponentType.Button,
                label: locale.ban.components.cancel,
                customId: 'Doremi-ban$cancel',
                style: ButtonStyle.Danger,
              },
            ],
          },
        ],
        ephemeral: true,
      })

      const confirmation =
        await response.awaitMessageComponent<ComponentType.Button>({
          filter: i => interaction.user.id === i.user.id,
          time: 600_000,
        })

      await banMember(confirmation, {
        member,
        reason,
      })
    }
  }
}
