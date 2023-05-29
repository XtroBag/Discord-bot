import { EmbedBuilder, codeBlock } from "discord.js";
import { MessageClass } from "../../structures/message.js";
import { inspect } from "util";

export default new MessageClass({
  data: {
    name: "eval",
    description: "Run code in chat",
    ownerOnly: true,
  },
  // @ts-ignore
  async run(client, message, args) {
    const embed = new EmbedBuilder().setTitle("Evaluating...");
    const msg = await message.reply({ embeds: [embed] });
    try {
      const data = await eval(args.join(" ").replace(/```/g, ""));
      let output = data;
      if (typeof data !== "string") {
        output = inspect(data);
      }
      embed.setTitle("Code Executed");
      embed.setDescription(codeBlock(output));
      await msg.edit({ embeds: [embed] });
    } catch (e) {
      embed.setTitle("An Error has occured");
      return await msg.edit({ embeds: [embed] });
    }
  },
});
