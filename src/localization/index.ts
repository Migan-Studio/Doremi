import korean from './json/ko.json'
import english from './json/en.json'
import { Locale, PermissionFlagsBits } from 'discord.js'

export function ifNonePermissions(
  locale: Locale,
  permissions: string,
  bot: boolean = false
): string {
  if (locale === Locale.Korean) {
    if (bot) return `❌ 이 봇에 \`${permissions}\` 권한이 필요해요 :(`
    return `❌ \`${permissions}\` 권한이 필요해요 :(`
  } else {
    if (bot) return `❌ I'm not have permissions has \`${permissions}\` :(`
    return `❌ You not have permissions has \`${permissions}\` :(`
  }
}

export function ifDM(locale: Locale): string {
  if (locale === Locale.Korean) {
    return `❌ 개인 메세지에선 해당 명령어를 사용 할 수 없어요 :(`
  } else {
    return `❌ Can't Using the DM :(`
  }
}

export function ifNotDeveloper(locale: Locale): string {
  if (locale === Locale.Korean)
    return '❌ 해당 명령어는 개발자만 사용 가능해요 :('
  else return '❌ This command is developer only :('
}

export function localizations(locale: Locale) {
  if (locale === Locale.Korean) {
    return korean
  } else {
    return english
  }
}

export function getPermissions(locale: Locale, permission: bigint) {
  if (locale === Locale.Korean) {
    if (permission === PermissionFlagsBits.Administrator) return '관리자'
    else if (permission === PermissionFlagsBits.ManageMessages)
      return '메세지 관리하기'
    else if (permission === PermissionFlagsBits.BanMembers)
      return '멤버 차단하기'
    else if (permission === PermissionFlagsBits.KickMembers)
      return '멤버 추방하기'
    else if (permission === PermissionFlagsBits.ManageChannels)
      return '채널 관리하기'
  } else {
    if (permission === PermissionFlagsBits.Administrator) return 'Administrator'
    else if (permission === PermissionFlagsBits.ManageMessages)
      return 'Manage Messages'
    else if (permission === PermissionFlagsBits.BanMembers) return 'Ban Members'
    else if (permission === PermissionFlagsBits.KickMembers)
      return 'Kick Members'
    else if (permission === PermissionFlagsBits.ManageChannels)
      return 'Manage Channels'
  }
}

export { korean, english }
