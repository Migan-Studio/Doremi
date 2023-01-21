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
import { english, ifDM, korean } from '@localizations'
import os from 'os'

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
            .setTitle(
              korean.info.embeds.title.replace(
                '{name}',
                interaction.client.user!.username
              )
            )
            .setDescription(
              codeBlock(
                'md',
                `# OS 정보
- ${os.platform} ${os.arch}

# 봇 개발자
- ${interaction.client.users.cache.get(process.env.OWNER_ID!)!.tag}

# Node.js 버전
- ${process.version}

# PID
- ${process.pid}

# 서버수
- ${interaction.client.guilds.cache.size}

# 유저수
- ${interaction.client.users.cache.size}

# 지연시간
- ${interaction.client.ws.ping}ms`
              )
            ),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('Doremi-select$info')
              .setOptions([
                {
                  label: korean.info.components.bot.label,
                  description: korean.info.components.bot.description,
                  value: 'Doremi-info$home',
                },
                {
                  label: korean.info.components.guild.label,
                  description: korean.info.components.guild.description,
                  value: 'Doremi-info$guild',
                },
                {
                  label: korean.info.components.user.label,
                  description: korean.info.components.user.description,
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
            .setTitle(
              english.info.embeds.title.replace(
                '{name}',
                interaction.client.user!.username
              )
            )
            .setDescription(
              codeBlock(
                'md',
                `# OS info
- ${os.platform} ${os.arch}

# developer 
- ${interaction.client.users.cache.get(process.env.OWNER_ID!)!.tag}

# Node.js version 
- ${process.version}

# PID
- ${process.pid}

# server count
- ${interaction.client.guilds.cache.size}

# user count 
- ${interaction.client.users.cache.size}

# ping
- ${interaction.client.ws.ping}ms`
              )
            ),
        ],
        components: [
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId('Doremi-select$info')
              .setOptions([
                {
                  label: english.info.components.bot.label,
                  description: english.info.components.bot.description,
                  value: 'Doremi-info$home',
                },
                {
                  label: english.info.components.guild.label,
                  description: english.info.components.guild.description,
                  value: 'Doremi-info$guild',
                },
                {
                  label: english.info.components.user.label,
                  description: english.info.components.user.description,
                  value: 'Doremi-info$user',
                },
              ])
          ),
        ],
      })
    }
  }
}
