import { EventClass } from "../../structures/event.js";
import { Guild } from "../../database/modals/guild.js";
import "dotenv/config";

export default new EventClass({
  name: "guildDelete",
  once: false,
  //@ts-ignore
  async execute(client, guild) {
    const server = await Guild.findOne({ id: guild.id });
    if (!server) return;

    server
      .deleteOne({ id: guild.id })
      .then(() => {
        console.log("Removed a guild from database! Guild: " + guild.name);
      })
      .catch((err) => {
        console.log(
          `Critical Error! Failed to remove Guild "${guild.name}" from the database! Error: ${err}`
        );
      });
  },
});
