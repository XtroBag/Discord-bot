import { EventClass } from "../../structures/event.js";
import "dotenv/config";
import { AFK } from "../../database/modals/afk.js";
import { EmbedBuilder } from "discord.js";
// import { EmbedBuilder } from "discord.js";

export default new EventClass({
  name: "messageCreate",
  once: false,
  // @ts-ignore
  async execute(client, message) {
    if (!message.guild || message.author.bot) return;

    const authorData = await AFK.findOne({ afk: true, id: message.author.id, time: { $lt: Date.now() - 5000 } });
    if (authorData) {
        message.reply({
            embeds: [
                new EmbedBuilder({
                    title: "AFK Removed",
                    description: `You are no longer AFK\nWhile you were AFK you were mentioned \`${authorData.mentions}\` times`
                }).setColor("#2F3136")
            ]
        });

        await AFK.findOneAndUpdate({ id: message.author.id }, { afk: false, mentions: 0 });
    }

    message.mentions.users.filter(u => !u.bot && u.id !== message.author.id).forEach(async user => {
        const data = await AFK.findOne({ afk: true, id: user.id });

        if (!data) return;
        message.reply({
            embeds: [
                new EmbedBuilder({
                    title: `${user.username} is AFK`,
                    description: `Reason: \`${data.reason}\`\nAFK Time: <t:${Math.round((Date.now() + Number(data.time)) / 1000)}:d>`
                }).setColor("#2F3136")
            ]
        });

        await AFK.findOneAndUpdate({ id: user.id }, { $inc: { mentions: 1 } });
    })}
});
