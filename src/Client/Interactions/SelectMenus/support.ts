import SelectMenus from './supportCategory'
import { SelectMenuInteraction } from 'discord.js'

export default {
  execute(interaction: SelectMenuInteraction, content: string) {
    // @ts-ignore
    SelectMenus[interaction.values[0]].default.execute(interaction, content)
  },
}
