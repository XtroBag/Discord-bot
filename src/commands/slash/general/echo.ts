import { ApplicationCommandType, MessageContextMenuCommandInteraction, hyperlink } from 'discord.js';
import { SlashClass } from '../../../structures/slash.js';

export default new SlashClass({
    data: {
        name: 'echo',
        type: ApplicationCommandType.Message,
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'Context',
        cooldown: 5,
        visible: true,
        guildOnly: false,
    },
    // @ts-ignore
    async execute(client, interaction: MessageContextMenuCommandInteraction<'cached'>) {
        const message = await interaction.targetMessage.fetch();
        if (!message?.content) return interaction.reply({
            content: hyperlink('No content was found in this message!', message.url),
            ephemeral: true
        })
        else return interaction.reply({
            content: hyperlink(message.content, message.url)
        });
    }
});
