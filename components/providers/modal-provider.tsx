"use client";

import CreateServerModal from "@/components/modals/CreateServer";
import { useEffect, useState } from "react";
import InviteModal from "@/components/modals/invite-modal";

export const ModalProvider = () => {
  // preventing modals to be rendered on server side (creates inconsistencies)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
    </>
  );
};
