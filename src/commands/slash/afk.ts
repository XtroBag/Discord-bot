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
  async execute(client, interaction: ChatInputCommandInteraction<'cached'>) {
    const data = await AFK.findOne({ afk: true, id: interaction.user.id });
            if (data) return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("❌ You Are Already AFK")
                        .setColor('#2F3136')
                ],
                ephemeral: true
            })
    
            const modal = new ModalBuilder({
                customId: 'afk_modal',
                title: "AFK Reason",
                components: [
                    new ActionRowBuilder<TextInputBuilder>({
                        components: [
                            new TextInputBuilder({
                                customId: "afk_reason",
                                label: "Reason",
                                required: true,
                                style: TextInputStyle.Short,
                                max_length: 30
                            })
                        ]
                    })
                ]
            });
    
            interaction.showModal(modal);
  },
});
