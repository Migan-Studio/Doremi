import {
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Locale,
  PermissionsBitField,
} from 'discord.js'
import { Command } from 'mbpr-rodule'
import { englishUS, ifDM, ifNonePermissions, korean } from '@localizations'

module.exports = class extends Command {
  public constructor() {
    super(englishUS.unban.name)
    this.data = {
      name: englishUS.unban.name,
      nameLocalizations: { ko: korean.unban.name },
      description: englishUS.unban.description,
      descriptionLocalizations: { ko: korean.unban.description },
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: englishUS.unban.options[0].name,
          nameLocalizations: { ko: korean.unban.options[0].name },
          description: englishUS.unban.options[0].description,
          descriptionLocalizations: { ko: korean.unban.options[0].name },
          required: true,
        },
      ],
    }
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
                .setTitle(korean.unban.embeds.title)
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
          content: englishUS.unban.IDIsNaN,
          ephemeral: true,
        })
      interaction!
        .guild!.members.unban(interaction.options.getString('id')!)
        .then(() => {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(englishUS.unban.embeds.title)
                .setDescription(englishUS.unban.embeds.description)
                .setTimestamp(),
            ],
          })
        })
        .catch(error => {
          interaction.reply({
            content: englishUS.unban.error,
            ephemeral: true,
          })
          console.log(error)
        })
    }
  }
}
