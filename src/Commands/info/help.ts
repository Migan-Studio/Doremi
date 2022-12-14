import { Command } from 'mbpr-rodule'
import { type ChatInputCommandInteraction, codeBlock, Locale } from 'discord.js'
import { english, korean } from '@localizations'

export default class HelpCommands extends Command {
  public constructor() {
    super(english.help.name)
    this.data = {
      name: english.help.name,
      nameLocalizations: { ko: korean.help.name },
      description: english.help.description,
      descriptionLocalizations: { ko: korean.help.description },
    }
  }

  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.locale === Locale.Korean) {
      interaction.reply({
        embeds: [
          {
            title: korean.help.embeds.title.replace(
              '{botName}',
              interaction.client.user!.username
            ),
            thumbnail: {
              url: interaction.client.user!.displayAvatarURL(),
            },
            description: `**참고. 이 봇은 [mbpr](https://github.com/Migan-Studio/mbpr)프로젝트를 기반하여 만들어 졌습니다.**
${codeBlock('md', korean.help.embeds.description)}`,
            timestamp: new Date().toISOString(),
          },
        ],
      })
    } else {
      interaction.reply({
        embeds: [
          {
            title: english.help.embeds.title.replace(
              '{botName}',
              interaction.client.user!.username
            ),
            thumbnail: {
              url: interaction.client.user!.displayAvatarURL(),
            },
            description: `**Note, this bot is based on the [mbpr](https://github.com/Migan-Studio/mbpr) project.**
${codeBlock('md', english.help.embeds.description)}`,
            timestamp: new Date().toISOString(),
          },
        ],
      })
    }
  }
}
