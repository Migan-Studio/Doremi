import korean from './json/ko.json'
import english from './json/en.json'
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

function ifNotDeveloper(locale: Locale): string {
  if (locale === Locale.Korean)
    return '❌ 해당 명령어는 개발자만 사용 가능해요 :('
  else return '❌ This command is developer only :('
}

export { korean, english, ifNonePermissions, ifDM, ifNotDeveloper }
