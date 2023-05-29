import { Message } from "discord.js";
import { ExtendedClient } from "./client.js";


interface CommandOptions {
    data: {
        name: string,
        description: string,
        ownerOnly: boolean
    };
    run: (client?: ExtendedClient, message?: Message, args?: any) => Promise<any>;
};

export class MessageClass {
    data: CommandOptions['data'];
    run?: CommandOptions['run'];

    constructor(options: CommandOptions) {
        this.data = options.data;
        this.run = options.run;
    };
};