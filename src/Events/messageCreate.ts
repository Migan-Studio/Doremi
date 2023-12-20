import { Listener } from 'discommand'
import { Events, type Message } from 'discord.js'
import Dokdo from 'dokdo'

export default class MessageCreate extends Listener {
  public constructor() {
    super(Events.MessageCreate)
  }
  public execute(msg: Message) {
    new Dokdo(msg.client, {
      prefix: `${msg.client.user.toString()} `,
      aliases: ['dok', 'dokdo', 'eval'],
      noPerm: msg =>
        msg.reply({ content: '❌ This command is developer only.' }),
      owners: [process.env.OWNER_ID!],
    }).run(msg)
  }
}
