import { EventClass } from "../../structures/event.js";
import { connect } from "mongoose";
import "dotenv/config";
import { ActivityType, PresenceStatusData } from "discord.js";
import { Config } from "../../../config.js";

export default new EventClass({
  name: "ready",
  once: true,
  async execute(client) {
    type OptionsEntry = {
      name: string;
      type:
        | ActivityType.Watching
        | ActivityType.Listening
        | ActivityType.Playing
        | ActivityType.Streaming
        | ActivityType.Competing;
      status: PresenceStatusData;
    };

    let options: OptionsEntry[] = [
      {
        name: "Coded in TypeScript",
        type: ActivityType.Watching,
        status: "online",
      },
      {
        name: "Developer XtroBag",
        type: ActivityType.Watching,
        status: "idle",
      },
    ];

    if (Config.globallyDisabled === true) {
      options = [
        {
          name: "All Disabled Cmds",
          type: ActivityType.Watching,
          status: "dnd",
        },
      ];
    }

    let i = 0;
    setInterval(() => {
      client.user.setPresence({
        activities: [
          {
            name: options[i % options.length].name,
            type: options[i % options.length].type,
          },
        ],
        status: options[i % options.length].status,
      });

      i++;
    }, 6000);

    //--------------------------------------------------

    console.log(`logged in as ${client.user.username}`);

    connect(process.env.URI)
      .then(() => console.log("Successfully connected to MongoDB!"))
      .catch((e) => console.log(e));
  },
});
