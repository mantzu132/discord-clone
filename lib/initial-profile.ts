import { db } from "@/lib/db";
import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";

//This is to fetch the initial profile when the user visits the main page, if it doesn't exist, create it.
const InitialProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const user: any = await currentUser();

  let profile;
  try {
    profile = await db.profile.upsert({
      where: { userId: userId },
      update: {},
      create: {
        userId: userId,
        name: user?.firstName,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  } catch (error) {
    console.log("Error creating profile:", error);
  }

  return profile;
};

export default InitialProfile;
