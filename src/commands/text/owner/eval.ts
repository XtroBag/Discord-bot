import { EmbedBuilder, codeBlock } from "discord.js";
import { TextClass } from "../../../structures/text.js";
import { inspect } from "util";

export default new TextClass({
  data: {
    name: "eval",
    description: "Run code in chat",
    ownerOnly: true,
    folder: 'owner'
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
      embed.setDescription(codeBlock('js', output));
      await msg.edit({ embeds: [embed] });
    } catch (e) {
      embed.setTitle("An Error has occured");
      return await msg.edit({ embeds: [embed] });
    }
  },
});
