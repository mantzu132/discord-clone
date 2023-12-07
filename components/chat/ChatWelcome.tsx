import { Hash } from "lucide-react";

interface ChatWelcomeProps {
  name: string;
  type: "channel" | "conversation";
}

const ChatWelcome = ({ name, type }: ChatWelcomeProps) => {
  return (
    <div className="flex-col mt-auto mb-4 px-4">
      {type === "channel" && (
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="w-12 h-12 text-white" />
        </div>
      )}
      <p className="font-bold text-xl md:text-3xl">
        {type === "channel" ? `Welcome to #${name}` : `Welcome ${name}`}
      </p>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        This is the start of your {type}
      </p>
    </div>
  );
};

export default ChatWelcome;
