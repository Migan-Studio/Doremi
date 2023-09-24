import { english, getSmhdw, korean, localizations } from '@localizations'
import {
  ApplicationCommandOptionType,
  GuildMember,
  type ChatInputCommandInteraction,
  type APIEmbed,
} from 'discord.js'
import { Command } from 'mbpr-rodule'
import { dayRegex, dicimal, hourRegex, minRegex, weekRegex } from '@utils'

export default class TimeoutCommands extends Command {
  public constructor() {
    super({
      name: english.timeout.name,
      nameLocalizations: { ko: korean.timeout.name },
      description: english.timeout.description,
      descriptionLocalizations: { ko: korean.timeout.description },
      options: [
        {
          type: ApplicationCommandOptionType.User,
          name: english.timeout.options.member.name,
          nameLocalizations: { ko: korean.timeout.options.member.name },
          description: english.timeout.options.member.description,
          descriptionLocalizations: {
            ko: korean.timeout.options.member.description,
          },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: english.timeout.options.time.name,
          nameLocalizations: { ko: korean.timeout.options.time.name },
          description: english.timeout.options.time.description,
          descriptionLocalizations: {
            ko: korean.timeout.options.time.description,
          },
          required: true,
        },
        {
          type: ApplicationCommandOptionType.String,
          name: english.timeout.options.reason.name,
          nameLocalizations: { ko: korean.timeout.options.reason.name },
          description: english.timeout.options.reason.description,
          descriptionLocalizations: {
            ko: korean.timeout.options.reason.description,
          },
        },
      ],
    })
  }

  public execute(interaction: ChatInputCommandInteraction) {
    const member = interaction.options.getMember('member')
    const time = interaction.options.getString('time', true)
    const resaon = interaction.options.getString('reason')
    const locale = localizations(interaction.locale)

    if (member instanceof GuildMember) {
      const embed: APIEmbed = {
        title: locale.timeout.name,
        description: locale.timeout.embeds.success.replace(
          '{member}',
          member.user.username,
        ),
        timestamp: new Date().toISOString(),
        color: 0x00ff00,
      }
      if (minRegex.test(time)) {
        const a = time.match(dicimal)![0] as unknown as number
        if (a > 40320)
          return interaction.reply({
            content: locale.timeout.embeds.max_value
              .replace('{time}', `40320`)
              .replace('{mhdw}', getSmhdw(interaction.locale, 'minute')),
            ephemeral: true,
          })

        member.disableCommunicationUntil(Date.now() + a * 60 * 1000, resaon!)

        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        })
      } else if (hourRegex.test(time)) {
        const a = time.match(dicimal)![0] as unknown as number
        if (a > 672)
          return interaction.reply({
            content: locale.timeout.embeds.max_value
              .replace('{time}', `672`)
              .replace('{mhdw}', getSmhdw(interaction.locale, 'hour')),
            ephemeral: true,
          })

        member.disableCommunicationUntil(Date.now() + a * 3600 * 1000, resaon!)

        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        })
      } else if (dayRegex.test(time)) {
        const a = time.match(dicimal)![0] as unknown as number
        if (a > 28)
          return interaction.reply({
            content: locale.timeout.embeds.max_value
              .replace('{time}', `28`)
              .replace('{mhdw}', getSmhdw(interaction.locale, 'day')),
            ephemeral: true,
          })

        member.disableCommunicationUntil(Date.now() + a * 86400 * 1000, resaon!)

        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        })
      } else if (weekRegex.test(time)) {
        const a = time.match(dicimal)![0] as unknown as number
        if (a > 4)
          return interaction.reply({
            content: locale.timeout.embeds.max_value
              .replace('{time}', `4`)
              .replace('{mhdw}', getSmhdw(interaction.locale, 'week')),
            ephemeral: true,
          })

        member.disableCommunicationUntil(
          Date.now() + a * 604_800 * 1000,
          resaon!,
        )

        interaction.reply({
          embeds: [embed],
          ephemeral: true,
        })
      } else
        return interaction.reply({
          embeds: [
            {
              title: locale.timeout.name,
              description: locale.timeout.embeds.time_error,
              color: 0xff0000,
              timestamp: new Date().toISOString(),
            },
          ],
          ephemeral: true,
        })
    }
  }
}
