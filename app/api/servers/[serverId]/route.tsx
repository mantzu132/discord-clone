import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serverSchema } from "@/types";

export async function PATCH(
  request: Request,
  { params }: { params: { serverId: string } },
) {
  try {
    const profile = await currentProfile();
    const body: unknown = await request.json();
    const parsedBody = serverSchema.parse(body);

    const { name, imageUrl } = parsedBody;
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
        profileId: profile.id, // Make sure the server belongs to the current profile
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    error;
    console.log("[SERVER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
