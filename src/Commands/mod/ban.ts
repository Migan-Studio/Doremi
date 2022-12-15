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
import { englishUS, ifDM, ifNonePermissions, korean } from '@localizations'

export default class BanCommands extends Command {
  public constructor() {
    super()
    this.name = englishUS.ban.name
    this.nameLocalizations = { ko: korean.ban.name }
    this.description = englishUS.ban.description
    this.descriptionLocalizations = { ko: korean.ban.description }
    this.options = [
      {
        type: ApplicationCommandOptionType.User,
        name: englishUS.ban.options[0].name,
        nameLocalizations: { ko: korean.ban.options[0].name },
        description: englishUS.ban.options[0].description,
        descriptionLocalizations: { ko: korean.ban.options[0].description },
        required: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: englishUS.ban.options[1].name,
        nameLocalizations: { ko: korean.ban.options[1].name },
        description: englishUS.ban.options[1].description,
        descriptionLocalizations: { ko: korean.ban.options[1].description },
        required: false,
      },
    ]
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
                .setTitle(korean.ban.embeds.title)
                .setDescription(korean.ban.embeds.description(member.user.tag))
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
                .setTitle(englishUS.ban.embeds.title)
                .setDescription(
                  englishUS.ban.embeds.description(member.user.tag)
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
