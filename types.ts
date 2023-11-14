import { Member, Profile, Server, Channel } from "@prisma/client";
import * as z from "zod";

export type FullServerInfo = Server & {
  channels: Channel[];
  members: (Member & { profile: Profile })[];
};

// Zod schema for the creation / editing of the server.
export const serverSchema = z.object({
  name: z.string().min(4, {
    message: "Server name is required.",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required.",
  }),
});
