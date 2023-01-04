import korean from './ko.json'
import english from './en.json'
import { Locale } from 'discord.js'

function ifNonePermissions(
  locale: Locale,
  permissions: string,
  bot: boolean
): string {
  if (locale === Locale.Korean) {
    if (bot) return `❌ 이 봇에 \`${permissions}\` 권한이 필요해요 :(`
    return `❌ \`${permissions}\` 권한이 필요해요 :(`
  } else {
    if (bot) return `❌ I'm not have permissions has \`${permissions}\` :(`
    return `❌ You not have permissions has \`${permissions}\` :(`
  }
}

function ifDM(locale: Locale): string {
  if (locale === Locale.Korean) {
    return `❌ 개인 메세지에선 해당 명령어를 사용 할 수 없어요 :(`
  } else {
    return `❌ Can't Using the DM :(`
  }
}

export { korean, english, ifNonePermissions, ifDM }
