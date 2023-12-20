import { Listener } from 'discommand'
import { type Client, Events, ActivityType } from 'discord.js'
import { Koreanbots } from '@migan/koreanbots'
import chalk from 'chalk'

export default class ClientReady extends Listener {
  public constructor() {
    super(Events.ClientReady)
  }
  public execute(client: Client<true>) {
    client.logger.log(`Bot name: ${chalk.cyan(client!.user.username)}`)
    function changeStatus() {
      client.user.setActivity({
        name: '/help | /도움말',
        type: ActivityType.Listening,
      })
    }
    changeStatus()
    setInterval(changeStatus, 10000)

    if (!process.env.KRBOTS_TOKEN) {
      return client.logger.log(
        `KoreanBots Token is ${chalk.red(
          'undefined',
        )}. Not define of koreanbots variable.`,
      )
    } else {
      const koreanBots = new Koreanbots({
        api: {
          token: process.env.KRBOTS_TOKEN,
        },
        clientId: client.user.id,
      })
      function update() {
        koreanBots.myBot
          .update({
            servers: client.guilds.cache.size,
          })
          .then(response => client.logger.log(response.message))
          .catch(err => {
            console.error(err)
          })
      }

      update()
      setInterval(update, 600000)
    }
  }
}
