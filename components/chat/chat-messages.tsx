"use client";
import ChatWelcome from "@/components/chat/ChatWelcome";
import { Member, Message, Profile } from "@prisma/client";
import { useChatQuery } from "@/hooks/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment } from "react";
import ChatItem from "@/components/chat/chat-item";
import { format } from "date-fns";

const DATE_FORMAT = "d MMM yyyy, HH:mm";
type MessageWithMemberWithProfile = Message & {
  member: Member & {
    profile: Profile;
  };
};
interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}
const ChatMessages = ({
  name,
  member,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramKey,
  paramValue,
  type,
}: ChatMessagesProps) => {
  const queryKey = `chat:${chatId}`;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useChatQuery({ apiUrl, paramValue, paramKey, queryKey });

  if (status === "pending") {
    return (
      <div className="flex flex-1 flex-col justify-center items-center gap-2 ">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Loading messages...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-1 flex-col justify-center items-center gap-2 ">
        <ServerCrash className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col py-4 overflow-y-auto ">
      <ChatWelcome name={name} type={type} />
      <div className="flex flex-col-reverse ">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.items.map((message: MessageWithMemberWithProfile) => (
              <ChatItem
                key={message.id}
                id={message.id}
                content={message.content}
                member={message.member}
                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                fileUrl={message.fileUrl || null}
                deleted={message.deleted}
                currentMember={member}
                isUpdated={message.updatedAt > message.createdAt}
                socketUrl={socketUrl}
                socketQuery={socketQuery}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};
export default ChatMessages;
