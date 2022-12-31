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
import { englishUS, ifDM, ifNonePermissions, korean } from '@localizations'

export default class KickCommands extends Command {
  constructor() {
    super(englishUS.kick.name)
    this.data = {
      name: englishUS.kick.name,
      nameLocalizations: { ko: korean.kick.name },
      description: englishUS.kick.description,
      descriptionLocalizations: { ko: korean.kick.description },
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: englishUS.kick.options[0].name,
          nameLocalizations: { ko: korean.kick.options[0].name },
          description: englishUS.kick.options[0].description,
          descriptionLocalizations: { ko: korean.kick.options[0].description },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: englishUS.kick.options[1].name,
          nameLocalizations: { ko: korean.kick.options[1].name },
          description: englishUS.kick.options[1].description,
          descriptionLocalizations: { ko: korean.kick.options[1].description },
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
                .setTitle(korean.kick.embeds.title)
                .setDescription(korean.kick.embeds.description(member.user.tag))
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
                .setTitle(englishUS.kick.embeds.title)
                .setDescription(
                  englishUS.kick.embeds.description(member.user.tag)
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
