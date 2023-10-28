import { db } from "@/lib/db";
import InitialProfile from "@/lib/initial-profile";
import {redirect} from "next/navigation"
import InitialModal from "@/components/modals/InitialModal";

const SetupPage = async () => {
    const profile = await InitialProfile();

    // Find the first server that the profile is a member of
    const server = await db.server.findFirst({
        where: {
            profileId: profile.id,
        },
    });

    if (!server) {
        return (
            <div>
                HELOW ORLD!
                <InitialModal/>
            </div>
        );
    }

    redirect(`/servers/${server.id}`);
};

export default SetupPage;