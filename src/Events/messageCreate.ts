import { Listener } from 'mbpr-rodule'
import { Events, Message } from 'discord.js'
import Dokdo from 'dokdo'

export default class MessageCreate extends Listener {
  public constructor() {
    super(Events.MessageCreate)
  }
  public execute(msg: Message) {
    new Dokdo(msg.client, {
      prefix: `<@${msg.client.user!.id}> `,
      aliases: ['dok', 'dokdo', 'eval'],
      noPerm: msg =>
        msg.reply({ content: '❌ This command is developer only.' }),
      owners: [process.env.OWNER_ID!],
    }).run(msg)
  }
}
