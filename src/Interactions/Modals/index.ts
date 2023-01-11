import { ModalSubmitInteraction } from 'discord.js'

export default class Modals {
  public readonly name: string
  public constructor(name: string) {
    this.name = name
  }

  execute(interaction: ModalSubmitInteraction) {
    const fileName = this.name.replace('Doremi-modal$', '')
    import(`./${fileName.replace('-r', 'R')}`).then(a =>
      a.default.execute(interaction)
    )
  }
}
