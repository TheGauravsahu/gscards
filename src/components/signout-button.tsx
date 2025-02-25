"use client";

import React, { useState } from "react";
import LoadingButton from "./loading-button";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          setPending(true);
        },
        onSuccess: () => {
          setPending(false);
          router.push("/sign-in");
        },
      },
    });
  }
  return (
    <LoadingButton pending={pending} onClick={handleSignOut}>
      Sign Out
    </LoadingButton>
  );
}
