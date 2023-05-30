import { TextClass } from "../../../structures/text.js";

export default new TextClass({
    data: {
        name: 'meme',
        description: 'get random memes',
        ownerOnly: false,
        folder: 'fun'
    },
    // @ts-ignore
   async run(client, message, args) {
        message.reply({ content: 'Meme command works!'})
    },
})