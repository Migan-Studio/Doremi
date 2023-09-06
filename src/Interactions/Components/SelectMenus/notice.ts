import { MessageComponent } from '@discommand/message-components'
import { ChannelType, type StringSelectMenuInteraction } from 'discord.js'

export default class NoticeSelectMenus extends MessageComponent {
  public constructor() {
    super('Doremi-select$notice')
  }
  public execute(interaction: StringSelectMenuInteraction) {
    const notice = interaction.client.notice

    interaction.client.channels.cache.forEach(channel => {
      if (channel.type !== ChannelType.GuildText) return
      if (!channel.topic) return
      if (channel.topic.includes(`${interaction.client.user?.username}-공지`))
        if (interaction.values[0] === 'Doremi-notice$ko') {
          channel.send({
            embeds: [
              {
                author: {
                  name: `공지 발송자: ${interaction.user.tag}`,
                  icon_url: interaction.user.displayAvatarURL(),
                },
                title: `${interaction.client.user!.username} 공지`,
                fields: [
                  {
                    name: notice.title,
                    value: notice.content,
                  },
                ],
              },
            ],
          })

          interaction.update({
            embeds: [
              {
                title: '공지',
                description: '한국어로 설정된 채널에 공지를 발송 했어요.',
              },
            ],
            components: [],
          })
        } else if (
          channel.topic.includes(`${interaction.client.user?.username}-notice`)
        )
          if (interaction.values[0] === 'Doremi-notice$en') {
            channel.send({
              embeds: [
                {
                  author: {
                    name: `Notice Sender: ${interaction.user.tag}`,
                    icon_url: interaction.user.displayAvatarURL(),
                  },
                  title: `${interaction.client.user!.username} Notice`,
                  fields: [
                    {
                      name: notice.title,
                      value: notice.content,
                    },
                  ],
                },
              ],
            })

            interaction.update({
              embeds: [
                {
                  title: '공지',
                  description: '영어로 설정된 채널에 공지를 발송 했어요.',
                },
              ],
              components: [],
            })
          }
    })
  }
}
