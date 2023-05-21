import { EventClass } from "../../structures/event.js";
import "dotenv/config";
import { AFK } from "../../database/modals/afk.js";
import { EmbedBuilder } from "discord.js";
import { Colors, Emojis } from "../../../config.js";

export default new EventClass({
  name: "messageCreate",
  once: false,
  // @ts-ignore
  async execute(client, message) {
    if (!message.guild || message.author.bot) return;

    const authorData = await AFK.findOne({
      afk: true,
      id: message.author.id,
      time: { $lt: Date.now() - 5000 },
    });
    if (authorData) {
      message
        .reply({
          embeds: [
            new EmbedBuilder()
              .addFields([
                {
                  name: `> ${Emojis.Information} AFK System`,
                  value: `**Details:**
            ${Emojis.Blank} Message: Welcome back <@${authorData.id}>!
            ${Emojis.Blank} Mentions: \`${authorData.mentions}\`
            `,
                },
              ])
              .setColor("#2F3136"),
          ],
          flags: "SuppressNotifications",
        })
        .then((msg) => {
          setTimeout(async () => {
            if (msg.deletable) {
              await msg.delete().catch(() => {});
            }
          }, 7000);
        });

      await AFK.findOneAndUpdate(
        { id: message.author.id },
        { afk: false, mentions: 0 }
      );
      await AFK.findOneAndRemove({ id: message.author.id });
    }

    message.mentions.users
      .filter((u) => !u.bot && u.id !== message.author.id)
      .forEach(async (user) => {
        const data = await AFK.findOne({ afk: true, id: user.id });

        if (!data) return;
        message.reply({
          embeds: [
            new EmbedBuilder()
              .setFields([
                {
                  name: `> ${Emojis.Information} AFK System`,
                  value: `**Details:**
                    ${Emojis.Blank} User: <@${data.id}>
                    ${Emojis.Blank} Reason: ${data.reason}
                    ${Emojis.Blank} Since: ${`<t:${Math.floor(
                    Number(data.time) / 1000
                  )}:R>`}
                    `,
                },
              ])
              .setColor(Colors.Information),
          ],
        });

        await AFK.findOneAndUpdate({ id: user.id }, { $inc: { mentions: 1 } });
      });
  },
});
