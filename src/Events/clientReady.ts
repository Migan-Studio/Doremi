import chalk, { Listener } from 'mbpr-rodule'
import { type Client, Events, ActivityType } from 'discord.js'
import process from 'process'
import { Koreanbots } from '@migan/koreanbots'

export default class ClientReady extends Listener {
  public constructor() {
    super(Events.ClientReady)
  }
  execute(client: Client) {
    if (!process.env.KRBOTS_TOKEN) {
      return client.loger.sendConsoleMessage(
        `KoreanBots Token is ${chalk.red(
          'undefined'
        )}. Not define of koreanbots variable.`
      )
    } else {
      const koreanbots = new Koreanbots({
        api: {
          token: process.env.KRBOTS_TOKEN!,
        },
        clientId: client.user!.id,
      })
      const update = () =>
        koreanbots.myBot
          .update({
            servers: client.guilds.cache.size,
          })
          .then(response => client.loger.sendConsoleMessage(response.message))

      setInterval(update, 600000)
    }

    const changeStatus = () =>
      client.user!.setActivity({
        name: '/help | /도움말',
        type: ActivityType.Listening,
      })
    changeStatus()
    setInterval(changeStatus, 10000)
  }
}
