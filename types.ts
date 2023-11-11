import { Member, Profile, Server, Channel } from "@prisma/client";

export type FullServerInfo = Server & {
  channels: Channel[];
  members: (Member & { profile: Profile })[];
};
