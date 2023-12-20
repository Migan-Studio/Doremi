import { Command } from 'discommand'
import {
  type ChatInputCommandInteraction,
  ChannelType,
  codeBlock,
  ComponentType,
} from 'discord.js'
import { english, ifDM, korean, localizations, getInfo } from '@localizations'
import os from 'node:os'

export default class InfoCommands extends Command {
  public constructor() {
    super({
      name: english.info.name,
      nameLocalizations: { ko: korean.info.name },
      description: english.info.description,
      descriptionLocalizations: { ko: korean.info.description },
    })
  }
  execute(interaction: ChatInputCommandInteraction) {
    const locale = localizations(interaction.locale)

    if (interaction.channel!.type === ChannelType.DM)
      return interaction.reply({
        content: ifDM(interaction.locale),
        ephemeral: true,
      })

    interaction.reply({
      embeds: [
        {
          author: {
            name: interaction.user.tag,
            icon_url: interaction.user.displayAvatarURL(),
          },
          title: locale.info.embeds.title.replace(
            '{name}',
            interaction.client.user.username,
          ),
          description: codeBlock(
            'md',
            getInfo(interaction.locale).bot({
              os: {
                platform: os.platform(),
                arch: os.arch(),
              },
              owner: interaction.client.users.cache.get(process.env.OWNER_ID!)!
                .tag,
              nodeJSVersion: process.version,
              pid: process.pid,
              count: {
                user: interaction.client.users.cache.size,
                guild: interaction.client.guilds.cache.size,
              },
              wsPing: interaction.client.ws.ping,
              version: interaction.client.version,
            }),
          ),
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.StringSelect,
              customId: 'Doremi-select$info',
              options: [
                {
                  label: locale.info.components.bot.label,
                  description: locale.info.components.bot.description,
                  value: 'Doremi-info$home',
                },
                {
                  label: locale.info.components.guild.label,
                  description: locale.info.components.guild.description,
                  value: 'Doremi-info$guild',
                },
                {
                  label: locale.info.components.user.label,
                  description: locale.info.components.user.description,
                  value: 'Doremi-info$user',
                },
              ],
            },
          ],
        },
      ],
    })
  }
}
