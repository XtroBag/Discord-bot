// make command [UPLOAD] to upload mp3 files (CHECK FILE TYPE OF MUSIC FILE BEFORE UPLOADING TO DATABASE) then save in database under guild area
// then make a choice [PLAY]to send a audio through a voice channel they choose in slash command.
// make sure people with correct perms can do it

// when playing audio make sure to check if the user is inside the channel to be able to play it

import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
} from "discord.js";
import { SlashClass } from "../../../structures/slash.js";

export default new SlashClass({
  data: {
    name: "soundboard",
    description: "Play funny sound effects with longer times",
    type: ApplicationCommandType.ChatInput,
    options: [
      {
        name: "upload",
        description: "upload a sound",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "audio",
            description: "upload a audio sound to save",
            type: ApplicationCommandOptionType.Attachment,
            required: true,
          },
        ],
      },
      {
        name: "play",
        description: "play sounds",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "sound",
            description: "pick a sound to play",
            type: ApplicationCommandOptionType.String,
            choices: [
              /* return data in objects to list them as choices */,
            ],
          },
        ],
      },
    ],
  },
  opt: {
    userPermissions: ["Connect", "UseSoundboard"],
    botPermissions: ["UseSoundboard"],
    category: "fun",
    cooldown: 5,
    visible: true,
    guildOnly: true,
  },
  // @ts-ignore
  async execute(client, interaction: ChatInputCommandInteraction<"cached">) {
    
  },
});
