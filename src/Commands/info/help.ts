import { Command } from 'mbpr-rodule'
import {
  type ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  Locale,
} from 'discord.js'
import { englishUS, korean } from '@localizations'

export default class HelpCommands extends Command {
  public constructor() {
    super(englishUS.help.name)
    this.data = {
      name: englishUS.help.name,
      nameLocalizations: { ko: korean.help.name },
      description: englishUS.help.description,
      descriptionLocalizations: { ko: korean.help.description },
    }
  }

  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.locale === Locale.Korean) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              korean.help.embeds.title(interaction.client.user!.username)
            )
            .setThumbnail(interaction.client.user!.displayAvatarURL())
            .setDescription(
              `
            **참고. 이 봇은 [mbpr](https://github.com/Migan-Studio/mbpr)프로젝트를 기반하여 만들어 졌습니다.**
            ${codeBlock('md', korean.help.embeds.description)}`
            )
            .setTimestamp(),
        ],
      })
    } else {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(
              englishUS.help.embeds.title(interaction.client.user!.username)
            )
            .setDescription(
              `**Note, this bot is based on the [mbpr](https://github.com/Migan-Studio/mbpr) project.**
              ${codeBlock('md', englishUS.help.embeds.description)}`
            )
            .setTimestamp(),
        ],
      })
    }
  }
}
