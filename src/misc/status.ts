import { ActivityType, PresenceStatusData } from "discord.js";
import { ExtendedClient } from "../structures/client.js";

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
    status: 'dnd'
  }
];

export function Presence(client: ExtendedClient) {
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
}
