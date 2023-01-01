import type { StringSelectMenuInteraction } from 'discord.js'
import InfoCategory from '@interactions/SelectMenus/InfoCategory'
import SupportCategory from '@interactions/SelectMenus/supportCategory'

export default class SelectMenus {
  public readonly name: string
  public constructor(name: string) {
    this.name = name
  }

  public execute(interaction: StringSelectMenuInteraction) {
    switch (this.name) {
      case 'Doremi-select$info':
        new InfoCategory(interaction.values[0]).execute(interaction)
        break
      case 'Doremi-select$support':
        new SupportCategory(interaction.values[0]).execute(interaction)
        break
    }
  }
}
