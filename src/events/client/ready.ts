import { EventClass } from "../../structures/event.js";
import { connect } from "mongoose";
import "dotenv/config";
import { ActivityType, PresenceStatusData } from "discord.js";

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
    const options: OptionsEntry[] = [
      {
        name: "Coded in typescript",
        type: ActivityType.Watching,
        status: "online",
      },
      {
        name: "Enjoying Development",
        type: ActivityType.Watching,
        status: "idle",
      },
      {
        name: "Disabled Commands",
        type: ActivityType.Watching,
        status: "dnd",
      },
    ];

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
    }, 7000);

    //--------------------------------------------------

    console.log(`logged in as ${client.user.username}`);

    connect(process.env.URI)
      .then(() => console.log("Successfully connected to MongoDB!"))
      .catch((e) => console.log(e));
  },
});
