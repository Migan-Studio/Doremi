import { ModalSubmitInteraction } from 'discord.js'

export default class Modals {
  public readonly name: string
  public constructor(name: string) {
    this.name = name
  }

  execute(interaction: ModalSubmitInteraction) {
    const fileName = this.name.replace('Doremi-modal$', '').replace('-r', 'R')
    switch (fileName) {
      case 'notice':
        import(`./notice.js`).then(a => a.default.execute(interaction))
        break
      case 'support':
        import(`./support.js`).then(a => a.default.execute(interaction))
        break
      case 'supportReply':
        import(`./supportReply.js`).then(a => a.default.execute(interaction))
        break
    }
  }
}
