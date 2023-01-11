import type { StringSelectMenuInteraction } from 'discord.js'

export default class InfoSelectMenu {
  public execute(interaction: StringSelectMenuInteraction) {
    const fileName = interaction.values[0].replace('Doremi-info$', '')

    import(`./${fileName}`).then(a => a.default.execute(interaction))
  }
}
