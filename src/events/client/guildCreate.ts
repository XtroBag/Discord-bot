import { EventClass } from "../../structures/event.js";
import { Guild } from "../../database/modals/guild.js";
import "dotenv/config";

export default new EventClass({
  name: "guildCreate",
  once: false,
  //@ts-ignore
  async execute(client, guild) {
    (await Guild.findOne({ guildName: guild.name, id: guild.id })) || 
    (await Guild.create({
            guildName: guild.name,
            id: guild.id,
            discussion: {
              channel: 'None',
              set: false
            },
            logging: {
              name: 'None',
              channel: 'None',
              active: false
            }
        }));
        console.log(`${guild.name} has been added too the guilds database!`)
  },
});
