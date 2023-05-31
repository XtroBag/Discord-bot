import type { PermissionResolvable, ApplicationCommandData } from "discord.js";
import { ExtendedClient } from "./client.js";

interface CustomOptions {
    userPermissions?: PermissionResolvable;
    botPermissions?: PermissionResolvable;
    category?: string;
    cooldown?: number;
    visible?: boolean;
    guildOnly?: boolean;
};

interface CommandOptions {
    data: ApplicationCommandData;
    opt?: CustomOptions;
    execute: (client?: ExtendedClient, ...args: any) => Promise<any>;
};

export class SlashClass {
    data: CommandOptions['data'];
    opt?: CommandOptions['opt'];
    execute?: CommandOptions['execute'];

    constructor(options: CommandOptions) {
        this.data = options.data;
        this.opt = options.opt;
        this.execute = options.execute;
    };
};