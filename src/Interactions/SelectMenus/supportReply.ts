import { MessageComponent } from '@discommand/message-components'
import { type StringSelectMenuInteraction } from 'discord.js'

export default class SupportReplySelectMenus extends MessageComponent {
  public constructor() {
    super('Doremi-select$supportReply')
  }
  public execute(interaction: StringSelectMenuInteraction) {
    const supportReply = interaction.client.supportReply
    if (interaction.values[0] === 'Doremi-supportReply$ko') {
      interaction.client.users.send(supportReply.id, {
        embeds: [
          {
            title: '지원',
            description: '지원에 관한 답장이 왔어요.',
            fields: [
              {
                name: '내용',
                value: supportReply.text,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      })
    } else if (interaction.values[0] === 'Doremi-supportReply$en')
      interaction.client.users.send(supportReply.id, {
        embeds: [
          {
            title: 'support',
            description: 'I got a reply about the support.',
            fields: [
              {
                name: 'Content',
                value: supportReply.text,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      })

    interaction.update({
      embeds: [
        {
          title: '지원답장',
          description: '내용이 성공적으로 갔어요.',
        },
      ],
      components: [],
    })
  }
}
