import { Command } from 'mbpr-rodule'
import {
  EmbedBuilder,
  ChatInputCommandInteraction,
  GuildMember,
  ChannelType,
  PermissionsBitField,
  ApplicationCommandOptionType,
  Locale,
} from 'discord.js'
import { english, ifDM, ifNonePermissions, korean } from '@localizations'

export default class KickCommands extends Command {
  constructor() {
    super(english.kick.name)
    this.data = {
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
    }
  }

  execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.options.getMember('member')
    const reason = interaction.options.getString('reason')
    if (member instanceof GuildMember) {
      if (interaction.locale === Locale.Korean) {
        if (interaction.channel!.type === ChannelType.DM)
          return interaction.reply({
            content: ifDM(Locale.Korean),
            ephemeral: true,
          })
        if (
          !interaction
            .guild!.members!.cache!.get(interaction.user.id)!
            .permissions.has(PermissionsBitField.Flags.KickMembers)
        )
          return interaction.reply({
            content: ifNonePermissions(Locale.Korean, '멤버 추방하기', false),
            ephemeral: true,
          })
        if (
          !interaction.guild!.members.me!.permissions.has(
            PermissionsBitField.Flags.KickMembers
          )
        )
          return interaction.reply({
            content: ifNonePermissions(Locale.Korean, '멤버 추방하기', true),
            ephemeral: true,
          })

        try {
          member.kick(reason || '없음')
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(korean.kick.name)
                .setDescription(
                  korean.kick.embeds.description.replace(
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
        if (interaction.channel!.type === ChannelType.DM)
          return interaction.reply({
            content: ifDM(Locale.EnglishUS),
            ephemeral: true,
          })
        if (
          !interaction
            .guild!.members!.cache!.get(interaction.user.id)!
            .permissions.has(PermissionsBitField.Flags.KickMembers)
        )
          return interaction.reply({
            content: ifNonePermissions(Locale.EnglishUS, 'Kick Members', false),
            ephemeral: true,
          })
        if (
          !interaction.guild!.members.me!.permissions.has(
            PermissionsBitField.Flags.KickMembers
          )
        )
          return interaction.reply({
            content: ifNonePermissions(Locale.EnglishUS, 'Kick Members', true),
            ephemeral: true,
          })

        try {
          member.kick(reason || 'None')
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(english.kick.name)
                .setDescription(
                  english.kick.embeds.description.replace(
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
