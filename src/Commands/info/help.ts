import { Command } from 'mbpr-rodule'
import {
  type APIEmbed,
  type ChatInputCommandInteraction,
  codeBlock,
  Locale,
  type APIButtonComponent,
  ButtonStyle,
  ComponentType,
} from 'discord.js'
import { english, korean } from '@localizations'

export default class HelpCommands extends Command {
  public constructor() {
    super({
      name: english.help.name,
      nameLocalizations: { ko: korean.help.name },
      description: english.help.description,
      descriptionLocalizations: { ko: korean.help.description },
    })
  }

  execute(interaction: ChatInputCommandInteraction) {
    const embed: APIEmbed = {
      timestamp: new Date().toISOString(),
      thumbnail: {
        url: interaction.client.user!.displayAvatarURL(),
      },
    }
    const button: APIButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Link,
      url: 'https://github.com/Migan-Studio/Doremi',
    }

    if (interaction.locale === Locale.Korean) {
      interaction.reply({
        embeds: [
          {
            ...embed,
            title: korean.help.embeds.title.replace(
              '{botName}',
              interaction.client.user!.username
            ),
            description: `**참고. 이 봇은 [mbpr](https://github.com/Migan-Studio/mbpr)프로젝트를 기반하여 만들어 졌습니다.**
${codeBlock('md', korean.help.embeds.description)}`,
          },
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                ...button,
                label: 'Doremi 소스코드',
              },
            ],
          },
        ],
      })
    } else {
      interaction.reply({
        embeds: [
          {
            ...embed,
            title: english.help.embeds.title.replace(
              '{botName}',
              interaction.client.user!.username
            ),
            description: `**Note, this bot is based on the [mbpr](https://github.com/Migan-Studio/mbpr) project.**
${codeBlock('md', english.help.embeds.description)}`,
          },
        ],
        components: [
          {
            type: ComponentType.ActionRow,
            components: [
              {
                ...button,
                label: 'Doremi Source code',
              },
            ],
          },
        ],
      })
    }
  }
}
