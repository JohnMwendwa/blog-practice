import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AdminPanel() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/admin/messages");
    } else {
      router.push("/admin/login");
    }
  }, [router, session]);
  return;
}
