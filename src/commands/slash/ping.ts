import { ApplicationCommandType, ChatInputCommandInteraction, inlineCode } from 'discord.js';
import { CommandClass } from '../../structures/command.js';

export default new CommandClass({
    data: {
        name: 'ping',
        description: 'Pong! Test the bots ping',
        type: ApplicationCommandType.ChatInput,
    },
    opt: {
        userPermissions: ['SendMessages'],
        botPermissions: ['SendMessages'],
        category: 'General',
        cooldown: 5,
        visible: true,
        guildOnly: false,
    },
    // @ts-ignore
    async execute(client, interaction: ChatInputCommandInteraction<'cached'>) {
        const msg = await interaction.reply({
            content: 'Pinging...',
            fetchReply: true
        }); 
        setTimeout(() => {
            const ping = msg.createdTimestamp - interaction.createdTimestamp;
            interaction.editReply({
                content: `Pong! Latency is ${inlineCode(`${ping}ms`)}. \nAPI Latency is ${inlineCode(`${interaction.client.ws.ping}ms`)}`
            });
        }, 3000);
    },
})