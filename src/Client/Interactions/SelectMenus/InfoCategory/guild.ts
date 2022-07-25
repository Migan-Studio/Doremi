import {
  SelectMenuInteraction,
  EmbedBuilder,
  Formatters,
  GuildVerificationLevel,
} from 'discord.js'

export = {
  execute(interaction: SelectMenuInteraction) {
    function returnServerSecurity() {
      switch (interaction.guild!.verificationLevel) {
        case GuildVerificationLevel.High:
          return '높음'
        case GuildVerificationLevel.Low:
          return '낮음'
        case GuildVerificationLevel.Medium:
          return '중간'
        case GuildVerificationLevel.None:
          return '없음'
        case GuildVerificationLevel.VeryHigh:
          return '매우 높음'
      }
    }

    interaction.update({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          })
          .setTitle(`${interaction.guild!.name}의 서버 정보`)
          .setThumbnail(interaction.guild!.iconURL())
          .setDescription(
            Formatters.codeBlock(
              'md',
              `# 서버의 이름
${interaction.guild!.name}

# 서버의 주인
${
  interaction.guild!.members!.cache!.get(interaction.guild!.ownerId)!.user.tag
} (${interaction.guild!.ownerId})

# 서버의 부스트 개수
${interaction.guild!.premiumSubscriptionCount}

# 서버의 보안
${returnServerSecurity()}

# 서버의 멤버수 (봇 포함)
${interaction.guild!.memberCount}

# 서버의 이모티콘 개수
${interaction.guild!.emojis.cache.size}

# 서버의 스티커 개수
${interaction.guild!.stickers.cache.size}`
            )
          )
          .addFields([
            {
              name: '서버의 생성일',
              value: `${Formatters.time(
                Math.floor(interaction.guild!.createdTimestamp / 1000)
              )} (${Formatters.time(
                Math.floor(interaction.guild!.createdTimestamp / 1000),
                'R'
              )})`,
            },
          ]),
      ],
    })
  },
}
