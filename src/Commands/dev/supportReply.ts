import { Command } from 'mbpr-rodule'
import {
  type ChatInputCommandInteraction,
  ComponentType,
  TextInputStyle,
} from 'discord.js'

export default class SupportReplyCommands extends Command {
  public constructor() {
    super({
      name: '지원답장',
      description: '[개발자 전용] Doremi의 지원답장',
    })
  }
  execute(interaction: ChatInputCommandInteraction) {
    if (interaction.user.id !== process.env.OWNER_ID)
      return interaction.reply({
        content: '❌ 해당 명령어는 개발자만 사용 가능해요. :(',
        ephemeral: true,
      })
    interaction.showModal(
      // new ModalBuilder()
      //   .setTitle('지원답장')
      //   .setCustomId('Doremi-modal$supportReply')
      //   .addComponents([
      //     new ActionRowBuilder<TextInputBuilder>().addComponents([
      //       new TextInputBuilder()
      //         .setCustomId('Doremi-supportReply$id')
      //         .setLabel('답장 할 유저의 ID를 적어주세요.')
      //         .setStyle(TextInputStyle.Short),
      //     ]),
      //     new ActionRowBuilder<TextInputBuilder>().addComponents([
      //       new TextInputBuilder()
      //         .setCustomId('Doremi-supportReply$text')
      //         .setLabel('답장 할 내용을 적어주세요.')
      //         .setStyle(TextInputStyle.Paragraph),
      //     ]),
      //   ])
      {
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
      }
    )
  }
}
