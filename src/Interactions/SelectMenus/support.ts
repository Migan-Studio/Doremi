import SelectMenus from './supportCategory'
import { StringSelectMenuInteraction } from 'discord.js'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    SelectMenus[interaction.values[0]].default.execute(interaction)
  },
}
