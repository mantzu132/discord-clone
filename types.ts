import { Member, Profile, Server, Channel, ChannelType } from "@prisma/client";
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

export const channelSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: "Channel name is required.",
    })
    .refine((name) => name != "general", {
      message: "Channel name cannot be 'general'.",
    }),
  type: z.nativeEnum(ChannelType),
});
