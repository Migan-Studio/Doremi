import { Command } from '../../Client'
import {
  EmbedBuilder,
  Formatters,
  ChatInputCommandInteraction,
} from 'discord.js'

export = class extends Command {
  name = '지연시간'
  description = 'Doremi의 지연시간'
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(`${interaction.client.user!.username}의 지연시간`)
          .setDescription(
            Formatters.codeBlock('md', `${interaction.client.ws.ping}ms`)
          ),
      ],
    })
  }
}
