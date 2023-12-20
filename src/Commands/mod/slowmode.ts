import { Command } from 'discommand'
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
          name: english.slowmode.options.time.name,
          nameLocalizations: { ko: korean.slowmode.options.time.name },
          description: english.slowmode.options.time.description,
          descriptionLocalizations: {
            ko: korean.slowmode.options.time.description,
          },
          maxValue: 21600,
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: english.slowmode.options.smh.name,
          nameLocalizations: { ko: korean.slowmode.options.smh.name },
          description: english.slowmode.options.smh.description,
          descriptionLocalizations: {
            ko: korean.slowmode.options.smh.description,
          },
          choices: [
            {
              name: english.slowmode.options.smh.choices.second,
              nameLocalizations: {
                ko: korean.slowmode.options.smh.choices.second,
              },
              value: english.slowmode.options.smh.choices.second,
            },
            {
              name: english.slowmode.options.smh.choices.minute,
              nameLocalizations: {
                ko: korean.slowmode.options.smh.choices.minute,
              },
              value: english.slowmode.options.smh.choices.minute,
            },
            {
              name: english.slowmode.options.smh.choices.hour,
              nameLocalizations: {
                ko: korean.slowmode.options.smh.choices.hour,
              },
              value: english.slowmode.options.smh.choices.hour,
            },
          ],
          required: true,
        },
      ],
    })
  }

  public execute(interaction: ChatInputCommandInteraction) {
    const locale = localizations(interaction.locale)
    const time = Math.floor(interaction.options.getNumber('time', true))
    const smh = interaction.options.getString('smh', true)

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
            PermissionFlagsBits.ManageChannels,
          )!,
        ),
        ephemeral: true,
      })

    if (
      !interaction.guild!.members.me!.permissions.has(
        PermissionFlagsBits.ManageChannels,
      )
    )
      return interaction.reply({
        content: ifNonePermissions(
          interaction.locale,
          getPermissions(
            interaction.locale,
            PermissionFlagsBits.ManageChannels,
          )!,
          true,
        ),
        ephemeral: true,
      })

    if (interaction.channel!.isDMBased())
      return interaction.reply({
        content: ifDM(interaction.locale),
      })

    if (time < 0)
      return interaction.reply({
        content: locale.slowmode.error.minus,
      })

    if (smh === 'second') {
      interaction.channel!.setRateLimitPerUser(time)
      interaction.reply({
        embeds: [
          {
            title: locale.slowmode.name,
            description: locale.slowmode.embeds.second.replace(
              '{time}',
              `${time}`,
            ),
          },
        ],
        ephemeral: true,
      })
    } else if (smh === 'minute') {
      if (time > 360)
        return interaction.reply({
          content: locale.slowmode.error.minute,
          ephemeral: true,
        })
      interaction.channel!.setRateLimitPerUser(time * 60)
      interaction.reply({
        embeds: [
          {
            title: locale.slowmode.name,
            description: locale.slowmode.embeds.minute.replace(
              '{time}',
              `${time}`,
            ),
          },
        ],
        ephemeral: true,
      })
    } else if (smh === 'hour') {
      if (time > 6)
        return interaction.reply({
          content: locale.slowmode.error.hour,
          ephemeral: true,
        })
      interaction.channel!.setRateLimitPerUser(time * 3600)
      interaction.reply({
        embeds: [
          {
            title: locale.slowmode.name,
            description: locale.slowmode.embeds.hour.replace(
              '{time}',
              `${time}`,
            ),
          },
        ],
        ephemeral: true,
      })
    }
  }
}
