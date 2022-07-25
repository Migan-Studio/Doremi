import { SelectMenuInteraction } from 'discord.js'
import SelectMenus from './InfoCategory'

export default {
  execute(interaction: SelectMenuInteraction, id: string) {
    interaction
      .channel!.createMessageComponentCollector({
        filter: i => i.user.id === id,
        time: 60000,
      })
      .on('collect', interaction => {
        // @ts-ignore
        console.log(SelectMenus[interaction.values[0]])
        // @ts-ignore
        SelectMenus[interaction.values[0]].execute(interaction)
      })
      .on('end', interaction => {
        interaction.first()!.editReply({ components: [] })
      })
  },
}
