import {
  ActionRowBuilder,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { CommandClass } from "../../structures/command.js";
import { AFK } from "../../database/modals/afk.js";
import { Colors, Emojis } from "../../../config.js";

export default new CommandClass({
  data: {
    name: "afk",
    description: "Become AFK with the bot",
    type: ApplicationCommandType.ChatInput,
  },
  opt: {
    userPermissions: ["SendMessages"],
    botPermissions: ["SendMessages"],
    category: "slash",
    cooldown: 5,
    visible: true,
    guildOnly: false,
  },
  // @ts-ignore
  async execute(client, interaction: ChatInputCommandInteraction<"cached">) {
    const data = await AFK.findOne({ afk: true, id: interaction.user.id });
    if (data)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .addFields([
              {
                name: `> ${Emojis.Cross} Operation Failed`,
                value: `**Details:** 
                        ${Emojis.Blank} Reason: You are already set afk
                        `,
              },
            ])
            .setColor(Colors.Error),
        ],
        ephemeral: true,
      });

    const modal = new ModalBuilder({
      customId: "afk_modal",
      title: "AFK Reason",
      components: [
        new ActionRowBuilder<TextInputBuilder>({
          components: [
            new TextInputBuilder({
              customId: "afk_reason",
              label: "Reason",
              required: true,
              style: TextInputStyle.Short,
              max_length: 30,
            }),
          ],
        }),
      ],
    });

    interaction.showModal(modal);
  },
});
