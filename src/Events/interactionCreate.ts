import { Listener } from 'mbpr-rodule'
import { Events, type Interaction, InteractionType } from 'discord.js'
import { Modals } from '@interactions'

export default class InteractionCreateListener extends Listener {
  public constructor() {
    super(Events.InteractionCreate)
  }
  execute(interaction: Interaction) {
    if (interaction.type === InteractionType.ModalSubmit) {
      new Modals(interaction.customId).execute(interaction)

      if (interaction.customId === 'Doremi-modal$support')
        interaction.client.supportText = interaction.fields.getTextInputValue(
          'Doremi-support$text'
        )
    }
  }
}
