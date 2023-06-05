// make command [UPLOAD] to upload mp3 files (CHECK FILE TYPE OF MUSIC FILE BEFORE UPLOADING TO DATABASE) then save in database under guild area
// then make a choice [PLAY]to send a audio through a voice channel they choose in slash command.
// make sure people with correct perms can do it

// !! set a max for sounds to be listed inside database for now and if exseeds limit have bot tell them when trying to upload more !!

// when playing audio make sure to check if the user is inside the channel to be able to play it

import {
  ApplicationCommandOptionType, 
  ApplicationCommandType,
} from "discord.js";
import { SlashClass } from "../../../structures/slash.js";
import { Guild } from "../../../database/modals/guild.js";
import { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } from "@discordjs/voice";

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
        name: "delete",
        description: "Delete a sound",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "delete",
            description: "Delete a audio from the ones saved",
            type: ApplicationCommandOptionType.String,
            required: true,
            // use autocomplete here to list options of songs in database
          },
        ],
      },
      {
        name: "play",
        description: "play a sound",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "sound",
            description: "pick a sound to play",
            type: ApplicationCommandOptionType.String,
            required: true
            //  return data in objects to list them as choices OR  !! (USE AUTOCOMPLETE SYSTEM INSTEAD) !!
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
 async auto(interaction) {
      interaction.options.getFocused()
  },
  // @ts-ignore
  async execute(client, interaction) {
    const choice = interaction.options.getSubcommand();
    const data = interaction.options.getAttachment("audio");
    
    const audio = interaction.options.getString('sound') // this will return the autocomplete choice of audios listed in database

    // ALSO CHECK IF SONG ALREADY EXISTS WITH SAME NAME
    // maybe make system to ask in buttons or menu to over-edit the current existing one

    switch (choice) {
      case "upload":
        if (
          // check the file type that is given
          data.contentType.startsWith("audio/") &&
          data.name.endsWith(".mp3")
        ) {
          if (Math.round(data.size / 1024 / 1024) > 4) {
            // check the size of the file before uploading
            return interaction.reply({
              content: "You're file size is too big!",
            });
          } else {
            // if passed all checks then run code to add it
            const guild = await Guild.findOne({ id: interaction.guild.id });
            if (guild.soundboard.length > 10) {
              return interaction.reply({
                content: `Too many audios are already set currently! [${guild.soundboard.length}]`,
              });
            } else {
              guild.collection.updateOne(
                { id: interaction.guild.id },
                { $push: { soundboard: { name: data.name, url: data.url } } }
              );

              interaction.reply({
                content: "Audio has been added too this guild!",
              });
            }
          }
        } else {
          return interaction.reply({
            content: "Content is not a MP3 file type!",
          });
        }

        break;

        case "Delete":
        break;


      case "play":
        if (!interaction.member.voice.channel) { return interaction.reply({ content: "You need to be in a voice channel to run this command"}) }
        
        const { id, guild } = interaction.member.voice.channel;
        const connection = joinVoiceChannel({
          adapterCreator: guild.voiceAdapterCreator,
          channelId: id,
          guildId: guild.id,
          selfDeaf: true,
        });

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
    
        connection.subscribe(player)

        const resource = createAudioResource(audio); // [AUDIO] is where the link of the database sound must go from autocomplete

        player.play(resource)

        // Use ARRAY.find() on database soundboard array to find the song searched to play and then decode it to play

        break;
    }
  },
});
