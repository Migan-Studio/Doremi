import { Command } from 'mbpr-rodule'
import {
  type ChatInputCommandInteraction,
  ChannelType,
  codeBlock,
  ComponentType,
} from 'discord.js'
import { english, ifDM, korean, localizations } from '@localizations'
import os from 'os'
import { getInfo } from '../../localization/index.js'

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

    // if (interaction.locale === Locale.Korean) {
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
            interaction.client.user.username
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
            })
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
    //     } else {
    //       if (interaction.channel!.type === ChannelType.DM)
    //         return interaction.reply({
    //           content: ifDM(Locale.EnglishUS),
    //           ephemeral: true,
    //         })
    //       interaction.reply({
    //         embeds: [
    //           new EmbedBuilder()
    //             .setAuthor({
    //               name: interaction.user.tag,
    //               iconURL: interaction.user.displayAvatarURL(),
    //             })
    //             .setTitle(
    //               english.info.embeds.title.replace(
    //                 '{name}',
    //                 interaction.client.user!.username
    //               )
    //             )
    //             .setDescription(
    //               codeBlock(
    //                 'md',
    //                 `# OS info
    // - ${os.platform} ${os.arch}
    //
    // # developer
    // - ${interaction.client.users.cache.get(process.env.OWNER_ID!)!.tag}
    //
    // # Node.js version
    // - ${process.version}
    //
    // # PID
    // - ${process.pid}
    //
    // # server count
    // - ${interaction.client.guilds.cache.size}
    //
    // # user count
    // - ${interaction.client.users.cache.size}
    //
    // # ping
    // - ${interaction.client.ws.ping}ms`
    //               )
    //             ),
    //         ],
    //         components: [
    //           new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    //             new StringSelectMenuBuilder()
    //               .setCustomId('Doremi-select$info')
    //               .setOptions([
    //                 {
    //                   label: english.info.components.bot.label,
    //                   description: english.info.components.bot.description,
    //                   value: 'Doremi-info$home',
    //                 },
    //                 {
    //                   label: english.info.components.guild.label,
    //                   description: english.info.components.guild.description,
    //                   value: 'Doremi-info$guild',
    //                 },
    //                 {
    //                   label: english.info.components.user.label,
    //                   description: english.info.components.user.description,
    //                   value: 'Doremi-info$user',
    //                 },
    //               ])
    //           ),
    //         ],
    //       })
    //     }
  }
}
