import { Command } from 'mbpr-rodule'
import {
  type APIEmbed,
  type ChatInputCommandInteraction,
  codeBlock,
  type APIButtonComponent,
  ButtonStyle,
  ComponentType,
} from 'discord.js'
import { english, korean, localizations } from '@localizations'

export default class HelpCommands extends Command {
  public constructor() {
    super({
      name: english.help.name,
      nameLocalizations: { ko: korean.help.name },
      description: english.help.description,
      descriptionLocalizations: { ko: korean.help.description },
    })
  }

  public execute(interaction: ChatInputCommandInteraction) {
    const locale = localizations(interaction.locale)
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

    interaction.reply({
      embeds: [
        {
          ...embed,
          title: locale.help.embeds.title.replace(
            '{botName}',
            interaction.client.user!.username,
          ),
          description: `${locale.help.embeds.description.copyright}
${codeBlock('md', locale.help.embeds.description.commands)}`,
        },
      ],
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              ...button,
              label: locale.help.components.link,
            },
          ],
        },
      ],
    })
  }
}
