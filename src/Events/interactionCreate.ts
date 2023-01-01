import { Listener } from 'mbpr-rodule'
import { Events, Interaction, InteractionType } from 'discord.js'
import Modals from '@interactions/Modals'
import SelectMenus from '@interactions/SelectMenus'

export default class InteractionCreateListener extends Listener {
  public constructor() {
    super(Events.InteractionCreate)
  }
  execute(interaction: Interaction) {
    if (interaction.type === InteractionType.ModalSubmit) {
      new Modals(interaction.customId).execute(interaction)

      interaction.client.supportText = interaction.fields.getTextInputValue(
        'Doremi-support$text'
      )
    } else if (interaction.type === InteractionType.MessageComponent) {
      if (!interaction.isStringSelectMenu()) return
      new SelectMenus(interaction.customId).execute(interaction)
    }
  }
}
