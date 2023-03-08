import { localizations, getInfo } from '@localizations'
import { codeBlock, StringSelectMenuInteraction } from 'discord.js'
import os from 'node:os'

export default {
  execute(interaction: StringSelectMenuInteraction) {
    const locale = localizations(interaction.locale)
    interaction.update({
      embeds: [
        {
          author: {
            name: interaction.user.tag,
            icon_url: interaction.user.displayAvatarURL(),
          },
          title: locale.info.embeds.title.replace(
            '{name}',
            interaction.client.user.username
          ),
          description: codeBlock(
            'md',
            getInfo(interaction.locale).bot({
              os: {
                platform: os.platform(),
                arch: os.arch(),
              },
              owner: interaction.client.users.cache.get(process.env.OWNER_ID!)!
                .tag,
              nodeJSVersion: process.version,
              pid: process.pid,
              count: {
                user: interaction.client.users.cache.size,
                guild: interaction.client.guilds.cache.size,
              },
              wsPing: interaction.client.ws.ping,
              version: interaction.client.version,
            })
          ),
        },
      ],
    })
  },
}
