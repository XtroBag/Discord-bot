import { EventClass } from "../../structures/event.js";
import { Presence } from "../../misc/status.js";

export default new EventClass({
  name: "ready",
  once: true,
  async execute(client) {
    Presence(client);
    console.log(`logged in as ${client.user.username}`);
  },
});
