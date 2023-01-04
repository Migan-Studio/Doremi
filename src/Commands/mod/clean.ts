import { english, ifDM, ifNonePermissions, korean } from '@localizations'
import {
  ApplicationCommandOptionType,
  ChannelType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Locale,
  PermissionsBitField,
} from 'discord.js'
import { Command } from 'mbpr-rodule'

export default class extends Command {
  public constructor() {
    super(english.clean.name)
    this.data = {
      name: english.clean.name,
      nameLocalizations: { ko: korean.clean.name },
      description: english.clean.description,
      descriptionLocalizations: { ko: korean.clean.description },
      options: [
        {
          type: ApplicationCommandOptionType.Number,
          name: english.clean.options.name,
          nameLocalizations: { ko: korean.clean.options.name },
          description: english.clean.options.description,
          descriptionLocalizations: { ko: korean.clean.options.description },
          required: true,
          minValue: 1,
          maxValue: 100,
        },
      ],
    }
  }

  async execute(interaction: ChatInputCommandInteraction) {
    const cleanLimit = interaction.options.getNumber(
      english.clean.options.name,
      true
    )
    if (interaction.locale === Locale.Korean) {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.Korean),
          ephemeral: true,
        })
      if (
        !interaction
          .guild!.members!.cache.get(interaction.user.id)!
          .permissions.has(
            PermissionsBitField.Flags.ManageMessages ||
              PermissionsBitField.Flags.Administrator
          )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '메세지 관리하기', false),
          ephemeral: true,
        })
      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.ManageMessages ||
            PermissionsBitField.Flags.Administrator
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.Korean, '메세지 관리하기', true),
          ephemeral: true,
        })
      await interaction.channel?.messages
        .fetch({
          limit: cleanLimit,
        })
        .then(messages => {
          const channel = interaction.channel!
          if (channel.type !== ChannelType.GuildText) return
          channel.bulkDelete(messages, true)
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(korean.clean.name)
                .setDescription(
                  korean.clean.embeds.description.replace(
                    '{count}',
                    `${cleanLimit}`
                  )
                ),
            ],
            ephemeral: true,
          })
        })
        .catch(error => console.log(error))
    } else {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.EnglishUS),
          ephemeral: true,
        })
      if (
        !interaction
          .guild!.members!.cache.get(interaction.user.id)!
          .permissions.has(
            PermissionsBitField.Flags.ManageMessages ||
              PermissionsBitField.Flags.Administrator
          )
      )
        return interaction.reply({
          content: ifNonePermissions(
            Locale.EnglishUS,
            'Manage Messages',
            false
          ),
          ephemeral: true,
        })
      if (
        !interaction.guild!.members.me!.permissions.has(
          PermissionsBitField.Flags.ManageMessages ||
            PermissionsBitField.Flags.Administrator
        )
      )
        return interaction.reply({
          content: ifNonePermissions(Locale.EnglishUS, 'Manage Message', true),
          ephemeral: true,
        })
      await interaction.channel?.messages
        .fetch({
          limit: cleanLimit,
        })
        .then(messages => {
          const channel = interaction.channel!
          if (channel.type !== ChannelType.GuildText) return
          channel.bulkDelete(messages, true)
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(english.clean.name)
                .setDescription(
                  english.clean.embeds.description.replace(
                    '{count}',
                    `${cleanLimit}`
                  )
                ),
            ],
            ephemeral: true,
          })
        })
        .catch(error => console.log(error))
    }
  }
}
