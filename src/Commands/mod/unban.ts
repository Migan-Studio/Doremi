import {
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Locale,
  PermissionsBitField,
} from 'discord.js'
import { Command } from 'mbpr-rodule'
import { english, ifDM, ifNonePermissions, korean } from '@localizations'

export default class extends Command {
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
  execute(interaction: ChatInputCommandInteraction) {
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
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.BanMembers
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '멤버 차단하기', true),
          ephemeral: true,
        })
      if (isNaN(interaction.options.getString('id') as unknown as number))
        return interaction.reply({
          content: korean.unban.IDIsNaN,
          ephemeral: true,
        })
      interaction!
        .guild!.members.unban(interaction.options.getString('id')!)
        .then(() => {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(korean.unban.name)
                .setDescription(korean.unban.embeds.description)
                .setTimestamp(),
            ],
          })
        })
        .catch(error => {
          interaction.reply({
            content: korean.unban.error,
            ephemeral: true,
          })
          console.log(error)
        })
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
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.BanMembers
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.EnglishUS, 'Ban Members', true),
          ephemeral: true,
        })
      if (isNaN(interaction.options.getString('id') as unknown as number))
        return interaction.reply({
          content: english.unban.IDIsNaN,
          ephemeral: true,
        })
      interaction!
        .guild!.members.unban(interaction.options.getString('id')!)
        .then(() => {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(english.unban.name)
                .setDescription(english.unban.embeds.description)
                .setTimestamp(),
            ],
          })
        })
        .catch(error => {
          interaction.reply({
            content: english.unban.error,
            ephemeral: true,
          })
          console.log(error)
        })
    }
  }
}
