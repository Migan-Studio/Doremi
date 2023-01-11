import { Command } from 'mbpr-rodule'
import {
  EmbedBuilder,
  ChannelType,
  type ChatInputCommandInteraction,
  GuildMember,
  ApplicationCommandOptionType,
  PermissionsBitField,
  Locale,
} from 'discord.js'
import { english, ifDM, ifNonePermissions, korean } from '@localizations'

export default class BanCommands extends Command {
  public constructor() {
    super(english.ban.name)
    this.data = {
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
    }
  }

  execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.options.getMember('member')
    const reason = interaction.options.getString('reason')

    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: ifDM(interaction.locale),
        ephemeral: true,
      })

    if (member instanceof GuildMember) {
      if (interaction.locale === Locale.Korean) {
        if (
          !interaction
            .guild!.members!.cache!.get(interaction.user.id)!
            .permissions.has(PermissionsBitField.Flags.BanMembers)
        )
          return interaction.reply({
            content: ifNonePermissions(Locale.Korean, '멤버 차단하기', false),
            ephemeral: true,
          })

        if (
          !interaction.guild!.members!.me!.permissions.has(
            PermissionsBitField.Flags.BanMembers
          )
        )
          return interaction.reply({
            content: ifNonePermissions(Locale.Korean, '멤버 차단하기', true),
            ephemeral: true,
          })

        try {
          member.ban({
            reason: reason || '없음',
          })
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(korean.ban.name)
                .setDescription(
                  korean.ban.embeds.description.replace(
                    '{member}',
                    member.user.tag
                  )
                )
                .setTimestamp(),
            ],
            ephemeral: true,
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        if (
          !interaction
            .guild!.members!.cache!.get(interaction.user.id)!
            .permissions.has(PermissionsBitField.Flags.BanMembers)
        )
          return interaction.reply({
            content: ifNonePermissions(Locale.EnglishUS, 'Ban Members', false),
            ephemeral: true,
          })

        if (
          !interaction.guild!.members!.me!.permissions.has(
            PermissionsBitField.Flags.BanMembers
          )
        )
          return interaction.reply({
            content: ifNonePermissions(Locale.EnglishUS, 'Ban Members', true),
            ephemeral: true,
          })

        try {
          member.ban({
            reason: reason || 'None',
          })
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(english.ban.name)
                .setDescription(
                  english.ban.embeds.description.replace(
                    '{member}',
                    member.user.tag
                  )
                )
                .setTimestamp(),
            ],
            ephemeral: true,
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
}
