import type { StringSelectMenuInteraction } from 'discord.js'

export default class InfoSelectMenu {
  public static execute(interaction: StringSelectMenuInteraction) {
    const fileName = interaction.values[0].replace('Doremi-info$', '')
    switch (fileName) {
      case 'guild':
        import(`./guild.js`).then(a => a.default.execute(interaction))
        break
      case 'home':
        import(`./home.js`).then(a => a.default.execute(interaction))
        break
      case 'user':
        import(`./user.js`).then(a => a.default.execute(interaction))
        break
    }
  }
}
