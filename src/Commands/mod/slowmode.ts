import { Command } from 'mbpr-rodule'
import {
  english,
  korean,
  localizations,
  getPermissions,
  ifNonePermissions,
  ifDM,
} from '@localizations'
import {
  ApplicationCommandOptionType,
  type ChatInputCommandInteraction,
  PermissionFlagsBits,
} from 'discord.js'

export default class SlowModeCommands extends Command {
  constructor() {
    super({
      name: english.slowmode.name,
      nameLocalizations: { ko: korean.slowmode.name },
      description: english.slowmode.description,
      descriptionLocalizations: { ko: korean.slowmode.description },
      options: [
        {
          type: ApplicationCommandOptionType.Number,
          name: english.slowmode.options.second.name,
          nameLocalizations: { ko: korean.slowmode.options.second.name },
          description: english.slowmode.options.second.description,
          descriptionLocalizations: {
            ko: korean.slowmode.options.second.description,
          },
          maxValue: 21600,
        },
        {
          type: ApplicationCommandOptionType.Number,
          name: english.slowmode.options.minute.name,
          nameLocalizations: { ko: korean.slowmode.options.minute.name },
          description: english.slowmode.options.minute.description,
          descriptionLocalizations: {
            ko: korean.slowmode.options.minute.description,
          },
          maxValue: 360,
        },
        {
          type: ApplicationCommandOptionType.Number,
          name: english.slowmode.options.hour.name,
          nameLocalizations: { ko: korean.slowmode.options.hour.name },
          description: english.slowmode.options.hour.description,
          descriptionLocalizations: {
            ko: korean.slowmode.options.hour.description,
          },
          maxValue: 6,
        },
      ],
    })
  }

  public execute(interaction: ChatInputCommandInteraction) {
    const locale = localizations(interaction.locale)
    const second = interaction.options.getNumber('second')
    const minute = interaction.options.getNumber('minute')
    const hour = interaction.options.getNumber('hour')

    if (
      !interaction
        .guild!.members.cache.get(interaction.user.id)!
        .permissions.has(PermissionFlagsBits.ManageChannels)
    )
      return interaction.reply({
        content: ifNonePermissions(
          interaction.locale,
          getPermissions(
            interaction.locale,
            PermissionFlagsBits.ManageChannels
          )!
        ),
      })

    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionFlagsBits.ManageChannels
      )
    )
      return interaction.reply({
        content: ifNonePermissions(
          interaction.locale,
          getPermissions(
            interaction.locale,
            PermissionFlagsBits.ManageChannels
          )!,
          true
        ),
      })

    if (interaction.channel!.isDMBased())
      return interaction.reply({
        content: ifDM(interaction.locale),
      })

    if (second) {
      interaction.channel!.setRateLimitPerUser(second)
      interaction.reply({
        embeds: [
          {
            title: locale.slowmode.name,
            description: locale.slowmode.embeds.second.replace(
              '{time}',
              `${second}`
            ),
          },
        ],
      })
    } else if (minute) {
      interaction.channel!.setRateLimitPerUser(minute * 60)
      interaction.reply({
        embeds: [
          {
            title: locale.slowmode.name,
            description: locale.slowmode.embeds.minute.replace(
              '{time}',
              `${minute}`
            ),
          },
        ],
      })
    } else if (hour) {
      interaction.channel!.setRateLimitPerUser(hour * 3600)
      interaction.reply({
        embeds: [
          {
            title: locale.slowmode.name,
            description: locale.slowmode.embeds.hour.replace(
              '{time}',
              `${hour}`
            ),
          },
        ],
      })
    } else {
      return interaction.reply({
        content: locale.slowmode.embeds.error,
      })
    }
  }
}
