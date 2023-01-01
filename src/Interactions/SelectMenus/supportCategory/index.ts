import type { StringSelectMenuInteraction } from 'discord.js'

export default class SupportCategory {
  public readonly values: string
  public constructor(values: string) {
    this.values = values
  }

  public execute(interaction: StringSelectMenuInteraction) {
    switch (this.values) {
      case 'Doremi-support$bug':
        import('./bugs').then(a => a.default.execute(interaction))
        break
      case 'Doremi-support$suggestion':
        import('./suggestions').then(a => a.default.execute(interaction))
        break
      case 'Doremi-support$other':
        import('./others').then(a => a.default.execute(interaction))
        break
    }
  }
}
