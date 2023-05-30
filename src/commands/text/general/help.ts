import {
  ActionRowBuilder,
  EmbedBuilder,
  ComponentType,
  StringSelectMenuBuilder,
} from "discord.js";
import { TextClass } from "../../../structures/text.js";

// NOTES:
// Need to currently fix so if another select menu is ran it will not throw errors too console and have it start working on using the next menu if selected by user
// CODE CURRENTLY THROWS ERRORS NEED TESTING
// "Unknown Interaction" prob coming from the collector thinking the wrong object is inside

export default new TextClass({
  data: {
    name: "help",
    description: "informaton about commands",
    ownerOnly: false,
    folder: "general",
  },
  // @ts-ignore
  async run(client, message, args) {
    const emojis = {
      general: "🧶",
      owner: "🪶",
      fun: "🪅",
    };

    const directories = [
      ...new Set(message.client.text.map((cmd) => cmd.data.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = message.client.text
        .filter((cmd) => cmd.data.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name,
            description: cmd.data.description || "Command has no description",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder().setDescription(
      "Please choose a category in the select menu"
    );

    const components = (state: boolean) => [
      new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([
        new StringSelectMenuBuilder()
          .setCustomId("help_menu")
          .setPlaceholder("Please Select a category")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `Commands are from ${cmd.directory} category`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          ),
      ]),
    ];

    const initialMessage = await message.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.isStringSelectMenu() &&
      interaction.user.id === message.author.id;

    const collector = message.channel.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      filter: filter,
      time: 30000, // take this off if don't want time on collector
    });

    collector.on("collect", (message) => {
      const [directory] = message.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new EmbedBuilder()
        .setTitle(`${formatString(directory)} commands`)
        .setDescription(
          `A list of all the commands categorized under ${directory}`
        )
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `\`${cmd.name}\``,
              value: `${cmd.description}`,
              inline: true,
            };
          })
        );

      message.update({ embeds: [categoryEmbed],  });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) })
      // MAKE IT SO THE MESSAGE CAN BE DELETED AFTER SOME TIME CURRENTLY NEEDS FIXING WHEN IF USER DELETED THE EMBED RESPONSE AND THEN BOT TRIES TO DELETE THROWS "Unkown Message" ERROR
      // .then((msg) => {
      //   setTimeout(async () => {
      //     if (msg.deletable) {
      //       await msg.delete().catch(() => {});
      //     }
      //   }, 7000);
      // });
    });
  },
});
