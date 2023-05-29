import { MessageClass } from "../../structures/message.js";

export default new MessageClass({
    data: {
        name: 'ping',
        description: 'use the ping command',
        ownerOnly: false
    },
    // @ts-ignore
   async run(client, message, args) {
        message.reply({ content: 'Ping command works!'})
    },
})