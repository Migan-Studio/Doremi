import type { StringSelectMenuInteraction } from 'discord.js'

export default class InfoCategory {
  public readonly values: string
  public constructor(values: string) {
    this.values = values
  }

  public execute(interaction: StringSelectMenuInteraction) {
    switch (this.values) {
      case 'Doremi-info$home':
        import('./home').then(a => a.default.execute(interaction))
        break
      case 'Doremi-info$guild':
        import('./guild').then(a => a.default.execute(interaction))
        break
      case 'Doremi-info$user':
        import('./user').then(a => a.default.execute(interaction))
        break
    }
  }
}
