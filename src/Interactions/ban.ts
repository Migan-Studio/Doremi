import type { ButtonInteraction } from 'discord.js'
import type { KickOrBanOptions } from '@client'
import { localizations } from '@localizations'

export async function banMember(
  interaction: ButtonInteraction,
  options: KickOrBanOptions,
) {
  const member = options.member
  const reason = options.reason
  const locale = localizations(interaction.locale)

  switch (interaction.customId) {
    case 'Doremi-ban$yes':
      try {
        await member.ban({
          reason: reason || 'None',
        })
        await interaction.update({
          embeds: [
            {
              title: locale.ban.name,
              description: locale.ban.embeds.success.replace(
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
              title: locale.ban.embeds.error,
              color: 0xff0000,
              timestamp: new Date().toISOString(),
            },
          ],
          components: [],
        })
      }
      break
    case 'Doremi-ban$cancel':
      await interaction.update({
        embeds: [
          {
            title: locale.ban.name,
            description: locale.ban.embeds.cancel,
            color: 0xff0000,
            timestamp: new Date().toISOString(),
          },
        ],
        components: [],
      })
      break
  }
}
