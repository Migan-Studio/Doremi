import { ModalSubmitInteraction } from 'discord.js'

export default class Modals {
  public readonly name: string
  public constructor(name: string) {
    this.name = name
  }

  execute(interaction: ModalSubmitInteraction) {
    switch (this.name) {
      case 'Doremi-modal$support':
        import('./support').then(a => a.default.execute(interaction))
        break
      case 'Doremi-modal$support-reply':
        import('./supportReply').then(a => a.default.execute(interaction))
        break
      case 'Doremi-modal$notice':
        import('./notice').then(a => a.default.execute(interaction))
        break
    }
  }
}
