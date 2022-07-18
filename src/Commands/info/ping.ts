import { Command } from '../../Client'
import {
  EmbedBuilder,
  Formatters,
  ChatInputCommandInteraction,
} from 'discord.js'

export = class extends Command {
  name = 'ping'
  description = "mbpr project's Ping"
  execute(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(`${interaction.client.user!.username}'s Latency`)
          .setDescription(
            Formatters.codeBlock('md', `${interaction.client.ws.ping}ms`)
          ),
      ],
    })
  }
}
