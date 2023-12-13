import { Hash } from "lucide-react";
import UserAvatar from "@/components/user-avatar";
import MobileToggle from "@/components/mobile-toggle";
import { SocketIndicator } from "@/components/socket-indicator";
import { ChatVideoButton } from "@/components/chat/chat-video-button";

interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

const ChatHeader = (props: ChatHeaderProps) => {
  const { serverId, name, type, imageUrl } = props;

  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <MobileToggle serverId={serverId} />
      {type === "channel" && (
        <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 ml-2" />
      )}
      {type === "conversation" && (
        <UserAvatar src={imageUrl} className="h-6 w-6 md:h-6 md:w-6 mr-2" />
      )}
      <p className="font-semibold text-md text-black dark:text-white mr-3">
        {name}
      </p>

      {type === "conversation" && <ChatVideoButton />}
      <div className="ml-auto">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
