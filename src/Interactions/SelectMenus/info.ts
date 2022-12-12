import { StringSelectMenuInteraction } from 'discord.js'
import SelectMenus from './InfoCategory'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    SelectMenus[interaction.values[0]].execute(interaction)
  },
}
