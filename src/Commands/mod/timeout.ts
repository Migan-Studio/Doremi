import { english, korean } from '@localizations'
import {
  ApplicationCommandOptionType,
  type ChatInputCommandInteraction,
} from 'discord.js'
import { Command } from 'mbpr-rodule'

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
      ],
    })
  }

  public execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: 'coming soon...',
      ephemeral: true,
    })
  }
}
