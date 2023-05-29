import { Schema, model } from "mongoose";

export interface Guild {
  guildName: string;
  id: string;
  discussion: {
    channel: string,
    set: boolean
  }
}

export const Guild = model("Guild", new Schema<Guild>({
    guildName: String,
    id: String,
    discussion: {
      channel: {
        type: String,
        default: "None"
      },
      set: Boolean
      
    }
    
  })
);