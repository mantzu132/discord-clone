"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile } from "lucide-react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "next-themes";

const EmojiPicker = ({ handleEmojiSelect }: any) => {
  const { theme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={55}
        side="right"
        align="end"
        alignOffset={50}
        className="bg-transparent border-0 shadow-none"
      >
        {" "}
        <Picker
          className="bg-red-900"
          data={data}
          theme={theme}
          onEmojiSelect={(emoji: Record<string, any>) =>
            handleEmojiSelect(emoji.native)
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
