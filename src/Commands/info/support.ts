import { Command } from 'mbpr-rodule'
import {
  type ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  Locale,
} from 'discord.js'
import { english, korean } from '@localizations'

export default class SupportCommands extends Command {
  public constructor() {
    super(english.support.name)
    this.data = {
      name: english.support.name,
      nameLocalizations: { ko: korean.support.name },
      description: english.support.description,
      descriptionLocalizations: { ko: korean.support.description },
    }
  }
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.locale === Locale.Korean) {
      interaction.showModal(
        new ModalBuilder()
          .setCustomId('Doremi-modal$support')
          .setTitle(korean.support.name)
          .addComponents([
            new ActionRowBuilder<TextInputBuilder>().addComponents([
              new TextInputBuilder()
                .setCustomId('Doremi-support$text')
                .setLabel('문의 내용을 적어주세요.')
                .setStyle(TextInputStyle.Short),
            ]),
          ])
      )
    } else {
      interaction.showModal(
        new ModalBuilder()
          .setCustomId('Doremi-modal$support')
          .setTitle(english.support.name)
          .addComponents([
            new ActionRowBuilder<TextInputBuilder>().addComponents([
              new TextInputBuilder()
                .setCustomId('Doremi-support$text')
                .setLabel('Please write down your inquiry.')
                .setStyle(TextInputStyle.Short),
            ]),
          ])
      )
    }
  }
}
