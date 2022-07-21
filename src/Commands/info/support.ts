import { Command } from '../../Client'
import {
  ChatInputCommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  InteractionType,
} from 'discord.js'

export = class extends Command {
  name = '지원'
  description = 'Doremi의 지원'
  execute(interaction: ChatInputCommandInteraction) {
    const modal = new ModalBuilder()
      .setCustomId('Doremi-modal$support')
      .setTitle('지원')

    const supportText = new TextInputBuilder()
      .setCustomId('Doremi-support$text')
      .setLabel('문의 내용을 적어주세요.')
      .setStyle(TextInputStyle.Short)

    const firstActionRow = new ActionRowBuilder().addComponents([supportText])
    // @ts-ignore
    modal.addComponents([firstActionRow])
    interaction.showModal(modal)
  }
}
