import korean from './json/ko.json'
import english from './json/en.json'
import {
  Locale,
  PermissionFlagsBits,
  type PresenceStatus,
  Snowflake,
} from 'discord.js'

export function ifNonePermissions(
  locale: Locale,
  permissions: string,
  bot = false
): string {
  if (locale === Locale.Korean) {
    if (bot) return `❌ 이 봇에 \`${permissions}\` 권한이 필요해요 :(`
    return `❌ \`${permissions}\` 권한이 필요해요 :(`
  } else {
    if (bot) return `❌ I'm not have permissions has \`${permissions}\` :(`
    return `❌ You not have permissions has \`${permissions}\` :(`
  }
}

interface InfoBotOptions {
  os: {
    platform: string
    arch: string
  }
  owner: string
  nodeJSVersion: string
  pid: number
  count: {
    guild: number
    user: number
  }
  wsPing: number
  version: string
}

type InfoGuildSecurity =
  | '높음'
  | '낮음'
  | '중간'
  | '없음'
  | '매우 높음'
  | 'High'
  | 'Low'
  | 'Medium'
  | 'None'
  | 'Very High'

interface InfoGuildOptions {
  name: string
  owner: {
    name: string
    id: Snowflake
  }
  count: {
    boost: number
    member: number
    bot: number
    memberOnly: number
    emoji: number
    sticky: number
  }
  security: InfoGuildSecurity
}

interface InfoUserOptions {
  name: string
  tag: string
  status:
    | '없음'
    | '온라인'
    | '자리 비움'
    | '다른 용무 중'
    | '오프라인'
    | undefined
    | PresenceStatus
    | 'None'
  isBot: string
  nickname: string
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

export function getInfo(locale: Locale) {
  const localization = localizations(locale)
  return {
    bot: (options: InfoBotOptions): string =>
      localization.info.embeds.description.bot
        .replace('{platform}', options.os.platform)
        .replace('{arch}', options.os.arch)
        .replace('{owner}', options.owner)
        .replace('{NodeJSVersion}', options.nodeJSVersion)
        .replace('{pid}', `${options.pid}`)
        .replace('{guildCount}', `${options.count.guild}`)
        .replace('{userCount}', `${options.count.user}`)
        .replace('{wsPing}', `${options.wsPing}`)
        .replace('{version}', options.version),
    guild: (options: InfoGuildOptions): string =>
      localization.info.embeds.description.guild
        .replace('{name}', options.name)
        .replace('{ownerName}', options.owner.name)
        .replace('{ownerID}', options.owner.id)
        .replace('{boostCount}', `${options.count.boost}`)
        .replace('{security}', options.security)
        .replace('{memberCount}', `${options.count.member}`)
        .replace('{botCount}', `${options.count.bot}`)
        .replace('{memberOnlyCount}', `${options.count.memberOnly}`)
        .replace('{emojiCount}', `${options.count.emoji}`)
        .replace('{stickyCount}', `${options.count.sticky}`),
    user: (options: InfoUserOptions) =>
      localization.info.embeds.description.user
        .replace('{name}', options.name)
        .replace('{tag}', options.tag)
        .replace('{status}', options.status!)
        .replace('{isBot}', options.isBot)
        .replace('{nickname}', options.nickname),
  }
}

export { korean, english }
