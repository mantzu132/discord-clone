import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ServerIdPagePropsParams {
  params: {
    serverId: string;
  };
}
const ServerIdPage = async ({ params }: ServerIdPagePropsParams) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const server = await db.server.findFirst({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServerIdPage;
