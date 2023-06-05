// FIX THIS COMMAND TO MAKE BOT LEAVE RIGHT AFTER SONG/AUDIO IS OVER

import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ChatInputCommandInteraction,
} from "discord.js";
import { SlashClass } from "../../../structures/slash.js";
import { Guild } from "../../../database/modals/guild.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
} from "@discordjs/voice";

export default new SlashClass({
  data: {
    name: "sound",
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
            required: true,
            autocomplete: true,
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
    cooldown: 7,
    visible: true,
    guildOnly: true,
  },
  async auto(interaction) {
    const focusedValue = interaction.options.getFocused();
    const guild = await Guild.findOne({ id: interaction.guild.id });
    const choices = guild.soundboard;
    const filter = choices.filter((choice) =>
      choice.name.startsWith(focusedValue)
    );

    await interaction.respond(
      filter.map((data) => {
        let value: string;

        if (data.url.length >= 99) {
          value = data.url.replace(
            "https://cdn.discordapp.com/ephemeral-attachments/",
            ""
          );
        }

        return {
          name: data.name,
          value: value,
        };
      })
    );
  },
  // @ts-ignore
  async execute(client, interaction: ChatInputCommandInteraction<"cached">) {
    const choice = interaction.options.getSubcommand();
    const data = interaction.options.getAttachment("audio");
    const audio = interaction.options.getString("sound");

    // ALSO CHECK IF SONG ALREADY EXISTS WITH SAME NAME
    // maybe make system to ask in buttons or menu to over-edit the current existing one

    switch (choice) {
      case "upload":
        if (
          data.contentType.startsWith("audio/") &&
          data.name.endsWith(".mp3")
        ) {
          if (Math.round(data.size / 1024 / 1024) > 4) {
            return interaction.reply({
              content: "You're file size is too big!",
            });
          } else {
            const guild = await Guild.findOne({ id: interaction.guild.id });

            if (data.name.length > 100) {
              interaction.reply({
                content: "File name is too long please lower it!",
              });
            } else {
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
        if (!interaction.member.voice.channel) {
          return interaction.reply({
            content: "You need to be in a voice channel to run this command",
          });
        }

        // do a check to make sure there is atleast 1 song added to database for it to be able to show choices

        const { channelId, guild } = interaction.member.voice;
        const connection = joinVoiceChannel({
          adapterCreator: guild.voiceAdapterCreator,
          channelId: channelId,
          guildId: guild.id,
          selfDeaf: true,
        });

        const player = createAudioPlayer({
          behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
          },
        });

        connection.subscribe(player);

        const resource = createAudioResource(
          `https://cdn.discordapp.com/ephemeral-attachments/${audio}`
        ); // [AUDIO] is where the link of the database sound must go from autocomplete

        player.play(resource);

        interaction.reply({
          content: "Playing the effect now",
          ephemeral: true,
        });

        break;
    }
  },
});
