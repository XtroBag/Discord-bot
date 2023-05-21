import { EventClass } from "../../structures/event.js";
import { connect } from "mongoose";
import { Presence } from "../../misc/status.js";
import "dotenv/config";

export default new EventClass({
  name: "ready",
  once: true,
  async execute(client) {
    Presence(client); // - Begins bots status

    console.log(`logged in as ${client.user.username}`);

    connect(process.env.URI)
    .then(()=> console.log('Successfully connected to MongoDB!'))
    .catch(e=> console.log(e));
  },
});
