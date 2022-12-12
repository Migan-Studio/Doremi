import korean from './ko'
import englishUS from './en-US'
import { Locale } from 'discord.js'

function ifNonePermissions(
  locale: Locale,
  Permissions: string,
  bot: boolean
): string {
  if (locale === Locale.Korean) {
    if (bot) return `❌ 이 봇에 \`${Permissions}\` 권한이 필요해요 :(`
    return `❌ \`${Permissions}\` 권한이 필요해요 :(`
  } else {
    if (bot) return `❌ i'm not have permissions has \`${Permissions}\` :(`
    return `❌ You not have permissions has \`${Permissions}\` :(`
  }
}

function ifDM(locale: Locale): string {
  if (locale === Locale.Korean) {
    return `❌ 개인 메세지에선 해당 명령어를 사용 할 수 없어요 :(`
  } else {
    return `❌ Can't Using the DM :(`
  }
}

export { korean, englishUS, ifNonePermissions, ifDM }
