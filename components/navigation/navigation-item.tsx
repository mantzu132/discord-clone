"use client";
import ActionTooltip from "@/components/action-tooltip";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export default function NavigationItem({
  id,
  imageUrl,
  name,
}: NavigationItemProps) {
  const params = useParams();
  const router = useRouter();

  function onButtonClick() {
    router.push(`servers/${id}`);
  }

  return (
    <ActionTooltip side="right" align="center" label={name}>
      <button
        onClick={onButtonClick}
        className="group relative flex items-center"
      >
        <div
          className={cn(
            "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
            params?.serverId === id
              ? "h-[36px]"
              : "group-hover:h-[20px] h-[8px]",
          )}
        />

        <div
          className={cn(
            "mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
            params?.serverId === id &&
              "bg-primary/10 text-primary rounded-[16px]",
          )}
        >
          <Image src={imageUrl} alt="Channel Image" width={48} height={48} />
        </div>
      </button>
    </ActionTooltip>
  );
}
