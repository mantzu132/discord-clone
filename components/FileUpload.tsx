"use client";

//Uploadthing
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";

// Next
import Image from "next/image";

// Others
import { X } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType != "pdf") {
    return (
      <div className={"relative h-20 w-20"}>
        <Image
          src={value}
          width={80}
          height={80}
          alt="Upload"
          className="rounded-full"
        />

        <button
          className=" text-white bg-rose-500 absolute top-0 right-0 shadow-sm"
          type="button"
          onClick={() => onChange("")}
        >
          <X />
        </button>
      </div>
    );
  }
  return (
    <UploadDropzone<OurFileRouter>
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
        console.log("Files: ", res);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
    />
  );
};
