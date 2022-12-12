import { Command } from 'mbpr-rodule'
import {
  type ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  InteractionType,
  Locale,
} from 'discord.js'
import { englishUS, korean } from '@localizations'

export default class SupportCommands extends Command {
  public constructor() {
    super()
    this.name = englishUS.support.name
    this.nameLocalizations = { ko: korean.support.name }
    this.description = englishUS.support.description
    this.descriptionLocalizations = { ko: korean.support.descirption }
  }
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.locale === Locale.Korean) {
      const modal = new ModalBuilder()
        .setCustomId('Doremi-modal$support')
        .setTitle(korean.support.name)

      const supportText = new TextInputBuilder()
        .setCustomId('Doremi-support$text')
        .setLabel('문의 내용을 적어주세요.')
        .setStyle(TextInputStyle.Short)

      const firstActionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents([supportText])
      modal.addComponents([firstActionRow])
      interaction.showModal(modal)

      interaction.client.once('interactionCreate', i => {
        if (i.type !== InteractionType.ModalSubmit) return
        interaction.client.supportText = i.fields.getTextInputValue(
          'Doremi-support$text'
        )
      })
    } else {
      const modal = new ModalBuilder()
        .setCustomId('Doremi-modal$support')
        .setTitle(englishUS.support.name)

      const supportText = new TextInputBuilder()
        .setCustomId('Doremi-support$text')
        .setLabel('Please write down your inquiry.')
        .setStyle(TextInputStyle.Short)

      const firstActionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents([supportText])
      modal.addComponents([firstActionRow])
      interaction.showModal(modal)

      interaction.client.once('interactionCreate', i => {
        if (i.type !== InteractionType.ModalSubmit) return
        interaction.client.supportText = i.fields.getTextInputValue(
          'Doremi-support$text'
        )
      })
    }
  }
}
