import { Command } from 'mbpr-rodule'
import {
  ActionRowBuilder,
  type ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
  codeBlock,
  Locale,
  StringSelectMenuBuilder,
} from 'discord.js'
import { englishUS, ifDM, korean } from '@localizations'

export default class InfoCommands extends Command {
  public constructor() {
    super()
    this.name = englishUS.info.name
    this.nameLocalizations = { ko: korean.info.name }
    this.description = englishUS.info.description
    this.descriptionLocalizations = { ko: korean.info.description }
  }
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.locale === Locale.Korean) {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.Korean),
          ephemeral: true,
        })

      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(korean.info.embeds.bot.title)
            .setDescription(
              codeBlock(
                'md',
                korean.info.embeds.bot.description({
                  developerTag: interaction.client.users.cache.get(
                    process.env.OWNER_ID!
                  )!.tag,
                  serverCount: interaction.client.guilds.cache.size,
                  userCount: interaction.client.users.cache.size,
                  wsPing: interaction.client.ws.ping,
                })
              )
            ),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('Doremi-select$info')
              .setOptions([
                {
                  label: korean.info.componets[0].label,
                  description: korean.info.componets[0].description,
                  value: 'Doremi-info$home',
                },
                {
                  label: korean.info.componets[1].label,
                  description: korean.info.componets[1].description,
                  value: 'Doremi-info$guild',
                },
                {
                  label: korean.info.componets[2].label,
                  description: korean.info.componets[2].description,
                  value: 'Doremi-info$user',
                },
              ])
          ),
        ],
      })
    } else {
      if (interaction.channel!.type === ChannelType.DM)
        return interaction.reply({
          content: ifDM(Locale.EnglishUS),
          ephemeral: true,
        })
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(englishUS.info.embeds.bot.title)
            .setDescription(
              codeBlock(
                'md',
                englishUS.info.embeds.bot.description({
                  developerTag: interaction.client.users.cache.get(
                    process.env.OWNER_ID!
                  )!.tag,
                  serverCount: interaction.client.guilds.cache.size,
                  userCount: interaction.client.users.cache.size,
                  wsPing: interaction.client.ws.ping,
                })
              )
            ),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('Doremi-select$info')
              .setOptions([
                {
                  label: englishUS.info.componets[0].label,
                  description: englishUS.info.componets[0].description,
                  value: 'Doremi-info$home',
                },
                {
                  label: englishUS.info.componets[1].label,
                  description: englishUS.info.componets[1].description,
                  value: 'Doremi-info$guild',
                },
                {
                  label: englishUS.info.componets[2].label,
                  description: englishUS.info.componets[2].description,
                  value: 'Doremi-info$user',
                },
              ])
          ),
        ],
      })
    }
  }
}
