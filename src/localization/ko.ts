import { Snowflake } from 'discord.js'
import os from 'os'

export default {
  help: {
    name: '도움말',
    description: 'Doremi의 도움말',
    embeds: {
      title(botName: string): string {
        return `${botName}의 도움말`
      },
      description: `# 정보
- 도움말

# 관리
- 추방
- 차단
- 채팅청소
- 차단해제`,
    },
  },
  ping: {
    name: '핑',
    description: 'Doremi의 핑',
    embeds: {
      title(botName: string): string {
        return `${botName}의 핑`
      },
      description(ping: number): string {
        return `${ping}ms`
      },
    },
  },
  kick: {
    name: '추방',
    description: 'Doremi의 추방',
    options: [
      {
        name: '멤버',
        description: '추방할 멤버',
      },
      {
        name: '사유',
        description: '추방할 사유',
      },
    ],
    embeds: {
      title: '추방',
      description(kickedMemberName: string): string {
        return `멤버 ${kickedMemberName}을/를 추방했어요.`
      },
    },
  },
  ban: {
    name: '차단',
    description: 'Doremi의 차단',
    options: [
      {
        name: '멤버',
        description: '차단할 멤버',
      },
      {
        name: '사유',
        description: '차단할 사유',
      },
    ],
    embeds: {
      title: '차단',
      description(kickedMemberName: string): string {
        return `멤버 ${kickedMemberName}을/를 차단했어요.`
      },
    },
  },
  clean: {
    name: '채팅청소',
    description: 'Doremi의 채팅청소',
    options: [
      {
        name: '청소-제한',
        description: '청소할 채팅의 갯수',
      },
    ],
    embeds: {
      title: '채팅청소',
      description(count: number): string {
        return `${count}개의 채팅을 청소했어요.`
      },
    },
  },
  unban: {
    name: '차단해제',
    description: 'Doremi의 차단 해제',
    options: [
      {
        name: '멤버id',
        description: '차단 해제할 멤버의 ID',
      },
    ],
    IDIsNaN: '값 `멤버id`는 멤버의 ID입니다.',
    embeds: {
      title: '차단 해제',
      description: '해당 멤버를 차단해제 했어요.',
    },
  },
  info: {
    name: '정보',
    description: 'Doremi의 정보',
    embeds: {
      bot: {
        title: '봇정보',
        description({
          developerTag,
          serverCount,
          userCount,
          wsPing,
        }: {
          developerTag: string
          serverCount: number
          userCount: number
          wsPing: number
        }): string {
          return `# OS 정보
- ${os.platform} ${os.arch}

# 봇 개발자
- ${developerTag}

# Node.js 버전
- ${process.version}

# PID
- ${process.pid}

# 서버수
- ${serverCount}

# 유저수
- ${userCount}

# 지연시간
- ${wsPing}`
        },
      },
      guild: {
        title: '서버 정보',
        description({
          name,
          owner,
          boosters,
          security,
          memberCount,
          emojis,
          stickers,
        }: {
          name: string
          owner: {
            tag: string
            id: Snowflake
          }
          boosters: number
          security: string
          memberCount: number
          emojis: number
          stickers: number
        }) {
          return `# 서버의 이름
${name}

# 서버의 주인
${owner.tag} (${owner.id})

# 서버의 부스트 개수
${boosters}

# 서버의 보안
${security}

# 서버의 멤버수 (봇 포함)
${memberCount}

# 서버의 이모티콘 개수
${emojis}

# 서버의 스티커 개수
${stickers}`
        },
      },
      user: {
        title(userName: string): string {
          return `${userName}의 정보`
        },
        description({
          userName,
          discriminator,
          presence,
          isBot,
          nickname,
        }: {
          userName: string
          discriminator: string
          presence: string
          isBot: string
          nickname: string
        }) {
          return `# 이름
- ${userName}

# 태그
- ${discriminator}

# 상태
- ${presence}

# 봇 여부
- ${isBot}

# 닉네임
- ${nickname}`
        },
      },
    },
    componets: [
      {
        label: '기본 정보',
        description: 'Doremi의 기본정보',
      },
      {
        label: '서버 정보',
        description: '명령어를 사용한 서버의 정보',
      },
      {
        label: '유저 정보',
        description: '명령어를 사용한 유저의 정보',
      },
    ],
  },
  support: {
    name: '지원',
    descirption: 'Doremi의 지원',
    embeds: {
      select: {
        description: '어느 항목으로 문의를 하실껀까요?',
      },
      send: {
        description(
          category: '버그' | '건의' | '기타',
          content: string
        ): string {
          return `${category} 카테고리 \`${content}\``
        },
      },
      end: {
        description: '문의가 성공적으로 갔어요.',
      },
    },
    componets: {
      bug: {
        label: '버그',
        description:
          'Doremi를 사용하면서 발생한 버그에 대해 문의하실 수 있어요.',
      },
      suggestions: {
        label: '건의',
        description:
          'Doremi를 사용하면서 불편했던 점이나 추가 되면 좋을 꺼 같은 기능을 문의하실 수 있어요.',
      },
      other: {
        label: '기타',
        description: 'Doremi를 사용하면서 궁금 했던 점을 문의하실 수 있어요.',
      },
    },
  },
}
