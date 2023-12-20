import { Command } from 'discommand'
import {
  type ChatInputCommandInteraction,
  TextInputStyle,
  ApplicationCommandOptionType,
  ComponentType,
} from 'discord.js'
import { english, korean, ifNotDeveloper, localizations } from '@localizations'

export default class SupportCommands extends Command {
  public constructor() {
    super({
      name: english.support.name,
      nameLocalizations: { ko: korean.support.name },
      description: english.support.description,
      descriptionLocalizations: { ko: korean.support.description },
      options: [
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: english.support.options.send.name,
          nameLocalizations: { ko: korean.support.options.send.name },
          description: english.support.options.send.description,
          descriptionLocalizations: {
            ko: korean.support.options.send.description,
          },
        },
        {
          type: ApplicationCommandOptionType.Subcommand,
          name: english.support.options.reply.name,
          nameLocalizations: { ko: korean.support.options.reply.name },
          description: english.support.options.reply.description,
          descriptionLocalizations: {
            ko: korean.support.options.reply.description,
          },
        },
      ],
    })
  }
  execute(interaction: ChatInputCommandInteraction) {
    const locale = localizations(interaction.locale)
    switch (interaction.options.getSubcommand()) {
      case 'send':
        interaction.showModal({
          customId: 'Doremi-modal$support',
          title: korean.support.name,
          components: [
            {
              type: ComponentType.ActionRow,
              components: [
                {
                  type: ComponentType.TextInput,
                  label: locale.support.components.modal,
                  style: TextInputStyle.Short,
                  customId: 'Doremi-support$text',
                },
              ],
            },
          ],
        })
        break
      case 'reply':
        if (interaction.user.id !== process.env.OWNER_ID)
          return interaction.reply({
            content: ifNotDeveloper(interaction.locale),
            ephemeral: true,
          })

        interaction.showModal({
          customId: 'Doremi-modal$supportReply',
          title: '지원답장',
          components: [
            {
              type: ComponentType.ActionRow,
              components: [
                {
                  customId: 'Doremi-supportReply$id',
                  type: ComponentType.TextInput,
                  label: '답장 할 유저의 ID를 적어주세요.',
                  style: TextInputStyle.Short,
                },
              ],
            },
            {
              type: ComponentType.ActionRow,
              components: [
                {
                  customId: 'Doremi-supportReply$text',
                  type: ComponentType.TextInput,
                  label: '답장 할 내용을 적어주세요.',
                  style: TextInputStyle.Paragraph,
                },
              ],
            },
          ],
        })
        break
    }
  }
}
