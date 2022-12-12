import os from 'os'
import { Snowflake } from 'discord.js'

export default {
  help: {
    name: 'help',
    description: "Doremi's help",
    embeds: {
      title(botName: string): string {
        return `${botName}'s help`
      },
      description: `# Information 
- help
- ping 

# moderation
- kick
- ban
- client
- unban`,
    },
  },
  ping: {
    name: 'ping',
    description: "Doremi's ping",
    embeds: {
      title(botName: string): string {
        return `${botName}'s ping`
      },
      description(ping: number): string {
        return `${ping}ms`
      },
    },
  },
  kick: {
    name: 'kick',
    description: "Doremi's kick",
    options: [
      {
        name: 'member',
        description: 'Member to kick',
      },
      {
        name: 'reason',
        description: 'a reason to kick',
      },
    ],
    embeds: {
      title: 'kick',
      description(kickedMemberName: string): string {
        return `Member ${kickedMemberName} has been kicked.`
      },
    },
  },
  ban: {
    name: 'ban',
    description: "Doremi's ban",
    options: [
      {
        name: 'member',
        description: 'Member to ban',
      },
      {
        name: 'reason',
        description: 'a reason to ban',
      },
    ],
    embeds: {
      title: 'ban',
      description(kickedMemberName: string): string {
        return `Member ${kickedMemberName} has been banned.`
      },
    },
  },
  clean: {
    name: 'clean',
    description: "Doremi's clean",
    options: [
      {
        name: 'clean-limit',
        description: "clean chat's limit",
      },
    ],
    embeds: {
      title: 'clean',
      description(count: number): string {
        return `${count} chat(s) have been deleted.`
      },
    },
  },
  unban: {
    name: 'unban',
    description: "Doremi's unban",
    options: [
      {
        name: 'memberid',
        description: "the unban member's ID",
      },
    ],
    IDIsNaN: "The value `memberid` is the member's ID.",
    embeds: {
      title: 'unban',
      description: 'The member has been unbaned.',
    },
  },
  info: {
    name: 'information',
    description: "Doremi's information",
    embeds: {
      bot: {
        title: 'Bot info',
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
          return `# OS info
- ${os.platform} ${os.arch}

# developer 
- ${developerTag}

# Node.js version 
- ${process.version}

# PID
- ${process.pid}

# server count
- ${serverCount}

# user count 
- ${userCount}

# ping
- ${wsPing}`
        },
      },
      guild: {
        title: 'server info',
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
          return `# name
${name}
  
# owner 
${owner.tag} (${owner.id})
  
# boost count
${boosters}

# security 
${security}

# member count (bot include)
${memberCount}

# emoji count
${emojis}

# sticker count
${stickers}`
        },
      },
      user: {
        title(userName: string): string {
          return `${userName}'(s) information`
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
          return `# name 
- ${userName}

# tag
- ${discriminator}

# presence
- ${presence}

# bot 
- ${isBot}

# nick 
- ${nickname}`
        },
      },
    },
    componets: [
      {
        label: 'default',
        description: "Doremi's default info",
      },
      {
        label: 'server info',
        description: 'About the server using the command',
      },
      {
        label: 'user info',
        description: "User's Information Using Commands",
      },
    ],
  },
  support: {
    name: 'support',
    description: "Doremi's suport",
    embeds: {
      select: {
        description: 'Which item are you going to inquire about?',
      },
      send: {
        description(
          category: 'bug' | 'suggestion' | 'other',
          content: string
        ): string {
          return `${category} category \`${content}\``
        },
      },
      end: {
        description: 'The inquiry went successfully.',
      },
    },
    componets: {
      bug: {
        label: 'bug',
        description:
          'You can inquire about a bug that occurred while using Doremi.',
      },
      suggestions: {
        label: 'suggestion',
        description:
          'You can inquire about any inconveniences or additional features you had while using Doremi.',
      },
      other: {
        label: 'other',
        description: 'You can ask questions while using Doremi.',
      },
    },
  },
}
