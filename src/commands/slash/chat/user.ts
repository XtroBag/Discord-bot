import {
  ActivityType,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { CommandClass } from "../../../structures/command.js";

export default new CommandClass({
  data: {
    name: "user",
    description: "Find general information about a discord user",
    options: [
      {
        name: "member",
        description: "The member to search",
        type: ApplicationCommandOptionType.User,
        required: true,
      },
    ],
  },
  opt: {
    userPermissions: ["SendMessages"],
    botPermissions: ["SendMessages"],
    category: "General",
    cooldown: 5,
    visible: true,
    guildOnly: false,
  },
  async execute(client, interaction: ChatInputCommandInteraction<"cached">) {
    const user = interaction.options.getUser("member");
    const normalUser = await client.users.fetch(user.id);

    const guildMember = interaction.options.getMember("member"); 

    const badges = [];
    const UserFlags = (await normalUser.fetchFlags(true)).toArray();

    if (UserFlags.length === 0) {
      badges.push(`None`|| 'None');
    }

    for (const flag of UserFlags) {
      switch (flag) {
        case "HypeSquadOnlineHouse1": // Bravery
          badges.push("<:HypesquadBravery:1054162269749125160>");
          break;
        case "HypeSquadOnlineHouse2": // Brilliance
          badges.push("<:HypesquadBrilliance:1054162348224557166>");
          break;
        case "HypeSquadOnlineHouse3": // Balance
          badges.push("<:HypesquadBalance:1054162268620869703>");
          break;
        case "VerifiedDeveloper": // Verified Developer
          badges.push("<:VerifiedDeveloper:1054162267337404466>");
          break;
        case "PremiumEarlySupporter": // Early Supporter
          badges.push("<:EarlySupporter:1054162266439823461>");
          break;
        case "Hypesquad": // Hype Squad
          badges.push("<:HypeSquadEvents:1054162416721731664>");
          break;
        case "BugHunterLevel1": // Bug Hunter [1]
          badges.push("<:BugHunter1:1054162263235379301>");
          break;
        case "BugHunterLevel2": // Bug Hunter [2]
          badges.push("<:BugHunter2:1054162264321704116>");
          break;
        case "CertifiedModerator": // Certified Moderator
          badges.push("<:CertifiedModerator:1054162265542230068>");
          break;
        case "Partner": // Partner
          badges.push("<:PartneredServer:1054162574817624084>");
          break;
        case "Staff": // Discord Staff
          badges.push("<:DiscordStaff:1054162480538067075>");
          break;
        case "ActiveDeveloper": // Active Developer
          badges.push("<:ActiveDeveloper:1054162262300053608>");
          break;
      }
    }

    if (guildMember) {
      const embed = new EmbedBuilder()
        .setTitle(`${guildMember.user.username}'s Profile`)
        .setThumbnail(guildMember.displayAvatarURL({ extension: "png" }))
        .addFields([
          {
            name: "General:",
            value:
              "\n<:Username:1108186381215334510> Username:" +
              ` \`\`${guildMember.user.username}\`\`` +
              "\n<:Nickname:1108186707947438203> Nickname:" +
              ` **${
                guildMember.nickname ?? " None"
              }**\n <:Blank:1069053209605308496>\` Active ›\` ${
                guildMember.nickname
                  ? `<:Check:1107897716157206568>`
                  : "<:Cross:1107897755017420871>"
              }` +
              "\n<:Discriminator:1108187095861825546> Discriminator:" +
              ` \`\`#${guildMember.user.discriminator}\`\`` +
              "\n<:Streaming:1108194225851465788> Streaming:" +
              `${
                guildMember.presence?.activities.filter(
                  (item) => item.name === "YouTube" || item.name === "Twitch"
                ).length > 0
                  ? guildMember.presence?.activities
                      .filter(
                        (item) =>
                          item.name === "YouTube" || item.name === "Twitch"
                      )
                      .map((activity) => {
                        if (activity.type === ActivityType.Streaming) {
                          return ` \`\`Online\`\``;
                        }
                      })
                  : " ``Offline``"
              }` +
              "\n<:Badges:1108202721904955422> Badges:" +
              `${badges.join(" ")}`,
          },
        ])
        .setColor("#2F3136")
        .setFooter({
          text: `${guildMember.user.tag} `,
          iconURL: guildMember.user.avatarURL({ extension: "png" }),
        })
        .setTimestamp();

      interaction.reply({ embeds: [embed] });
    } else if (normalUser) {
      const embed = new EmbedBuilder()
        .setTitle(`${normalUser.username}'s Profile`)
        .setFooter({ text: "User is not in this server" });

      interaction.reply({ embeds: [embed] });
    }
    
  },
});
