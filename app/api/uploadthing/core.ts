import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";

const f = createUploadthing();

const handleAuth = (req: Request): string => {
  const userId = auth().userId;

  if (!userId) throw new Error("Unauthorized");

  return userId;
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const userId = handleAuth(req);
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),

  messageFile: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "32MB" },
  })
    .middleware(async ({ req }) => {
      const userId = handleAuth(req);
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for messageFile, userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
