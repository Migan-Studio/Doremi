import { Listener } from 'mbpr-rodule'
import { Events, Message } from 'discord.js'
import Dokdo from 'dokdo'
import process from 'process'

export default class MessageCreate extends Listener {
  public constructor() {
    super(Events.MessageCreate)
  }
  execute(msg: Message) {
    const dokdo = new Dokdo(msg.client, {
      prefix: 'drm!',
      aliases: ['dok', 'dokdo', 'eval'],
      noPerm: msg => {
        msg.reply({ content: '❌ This command is developer only.' })
      },
      owners: [process.env.OWNER_ID!],
    })

    dokdo.run(msg)
  }
}
