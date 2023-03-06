import { Command } from 'mbpr-rodule'
import {
  type ChatInputCommandInteraction,
  TextInputStyle,
  ComponentType,
} from 'discord.js'
import { ifNotDeveloper } from '../../localization/index.js'

export default class NoticeCommands extends Command {
  public constructor() {
    super({
      name: '공지',
      nameLocalizations: { 'en-US': 'notice' },
      description: '[개발자 전용] Doremi의 공지',
      descriptionLocalizations: { 'en-US': "[Developer only] Doremi's notice" },
    })
  }
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID)
      return interaction.reply({
        content: ifNotDeveloper(interaction.locale),
        ephemeral: true,
      })

    interaction.showModal({
      customId: 'Doremi-modal$notice',
      title: '공지 보내기',
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: 'Doremi-notice$title',
              label: '제목',
              style: TextInputStyle.Short,
            },
          ],
        },
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              customId: 'Doremi-notice$content',
              label: '내용',
              style: TextInputStyle.Paragraph,
            },
          ],
        },
      ],
    })
  }
}
