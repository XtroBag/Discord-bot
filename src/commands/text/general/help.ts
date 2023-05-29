// import { ColorResolvable, EmbedBuilder } from "discord.js";
// import { Config } from "../../../../config.js";
import { TextClass } from "../../../structures/text.js";
import { readdir } from "fs/promises";

export default new TextClass({
  data: {
    name: "help",
    description: "informaton about all text commands",
    usage: "",
    ownerOnly: false,
  },
  // @ts-ignore
  async run(client, message, args) {
    if (!args[0]) {
    //   let categories = [];

      const directory = await readdir('../../dist/src/commands', { withFileTypes: true })

        for (const folder of directory) {
            console.log(folder)
        }


    //     const cmds = commands.map(async (command) => {
    //       let file = await import(`../../commands/${dir}/${command}`).then((module) => module?.default); // if errors try adding "../" into the code directory search

    //       if (!file.data.name) return "No command name.";

    //       let name = file.data.name.replace(".js", "");

    //       return `\`${name}\``;
    //     });

    //     let data = new Object();

    //     data = {
    //       name: dir.toUpperCase(),
    //       value: cmds.length === 0 ? "In progress." : cmds.join(" "),
    //     };

    //     categories.push(data);
    //   });

    //   const embed = new EmbedBuilder()
    //     .setTitle("📬 Need help? Here are all of my commands:")
    //     .addFields(categories)
    //     .setDescription(
    //       `Use \`${Config.prefix}help\` followed by a command name to get more additional information on a command. For example: \`${Config.prefix}help ping\`.`
    //     )
    //     .setFooter({ text: `Requested by ${message.author.tag}` })
    //     .setTimestamp()
    //     .setColor("Blurple");
    //   return message.reply({ embeds: [embed] });
    // } else {
    //   const command = client.text.get(args[0].toLowerCase());

    //   if (!command) {
    //     const embed = new EmbedBuilder()
    //       .setTitle(
    //         `Invalid command! Use \`${Config.prefix}help\` for all of my commands!`
    //       )
    //       .setColor("FF0000" as ColorResolvable);
    //     return message.reply({ embeds: [embed] });
    //   }

    //   const embed = new EmbedBuilder()
    //     .setTitle("Command Details:")
    //     .addFields([
    //       { name: "PREFIX:", value: `\`${Config.prefix}\`` },
    //       {
    //         name: "COMMAND:",
    //         value: command.data.name
    //           ? `\`${command.data.name}\``
    //           : "No name for this command.",
    //       },
    //       {
    //         name: "USAGE:",
    //         value: command.data.usage
    //           ? `\`${Config.prefix}${command.data.name} ${command.data.usage}\``
    //           : `\`${Config.prefix}${command.data.name}\``,
    //       },
    //       {
    //         name: "DESCRIPTION:",
    //         value: command.data.description
    //           ? command.data.description
    //           : "No description for this command.",
    //       },
    //     ])
    //     .setFooter({ text: `Requested by ${message.author.tag}` })
    //     .setTimestamp()
    //     .setColor("Blurple");

    //   return message.reply({ embeds: [embed] });
     }
  },
});
