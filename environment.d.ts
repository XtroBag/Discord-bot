import { Collection } from 'discord.js';
import { CommandClass } from './src/structures/command.js';
import { TextClass } from './src/structures/text.ts';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
            CLIENT_ID: string;
            GUILD_ID: string;
            URI: string;
            OPENAI_API_KEY: string;
        }
    }
}

declare module 'discord.js' {
    interface Client {
        slash: Collection<string, CommandClass>;
        cooldown: Collection<string, Collection<string, number>>;
        text: Collection<string, TextClass>
    }
}

export { };