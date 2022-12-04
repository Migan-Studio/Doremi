import { SelectMenuInteraction } from 'discord.js'
import SelectMenus from './InfoCategory'

export default {
  execute(interaction: SelectMenuInteraction, id: string) {
    // @ts-ignore
    SelectMenus[interaction.values[0]].execute(interaction)
  },
}
