import type { ButtonInteraction } from 'discord.js'
import type { KickOrBanOptions } from '@client'
import { localizations } from '@localizations'

export async function kickMember(
  interaction: ButtonInteraction,
  options: KickOrBanOptions,
) {
  const member = options.member
  const reason = options.reason
  const locale = localizations(interaction.locale)

  switch (interaction.customId) {
    case 'Doremi-kick$yes':
      try {
        await member.kick(reason || 'None')
        await interaction.update({
          embeds: [
            {
              title: locale.kick.name,
              description: locale.kick.embeds.success.replace(
                '{member}',
                member.user.tag,
              ),
              timestamp: new Date().toISOString(),
              color: 0x00ff00,
            },
          ],
          components: [],
        })
      } catch (error) {
        console.error(error)
        await interaction.update({
          embeds: [
            {
              title: locale.kick.embeds.error,
              color: 0xff0000,
              timestamp: new Date().toISOString(),
            },
          ],
          components: [],
        })
      }
      break
    case 'Doremi-kick$cancel':
      await interaction.update({
        embeds: [
          {
            title: locale.kick.name,
            description: locale.kick.embeds.cancel,
            color: 0xff0000,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
      break
  }
}
