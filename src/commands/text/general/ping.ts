import { TextClass } from "../../../structures/text.js";

export default new TextClass({
    data: {
        name: 'ping',
        description: 'use the ping command',
        ownerOnly: false,
        folder: 'general'
    },
    // @ts-ignore
   async run(client, message, args) {
        message.reply({ content: 'Ping command works!'})
    },
})