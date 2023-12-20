import { Listener } from 'discommand'
import { Events, type Interaction, InteractionType } from 'discord.js'
import { Modals } from '@interactions'

export default class InteractionCreateListener extends Listener {
  public constructor() {
    super(Events.InteractionCreate)
  }
  public execute(interaction: Interaction) {
    const client = interaction.client
    if (interaction.type === InteractionType.ModalSubmit) {
      const fields = interaction.fields
      new Modals(interaction.customId).execute(interaction)

      switch (interaction.customId) {
        case 'Doremi-modal$support':
          client.supportText = fields.getTextInputValue('Doremi-support$text')
          break
        case 'Doremi-modal$notice':
          client.notice = {
            title: fields.getTextInputValue('Doremi-notice$title'),
            content: fields.getTextInputValue('Doremi-notice$content'),
          }
          break
        case 'Doremi-modal$supportReply':
          client.supportReply = {
            id: fields.getTextInputValue('Doremi-supportReply$id'),
            text: fields.getTextInputValue('Doremi-supportReply$text'),
          }
          break
      }
    }
  }
}
