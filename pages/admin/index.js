import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function AdminPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/admin/messages", { permanent: true });
    } else {
      router.push("/admin/login", { permanent: true });
    }
  }, [router, session]);
  return;
}
