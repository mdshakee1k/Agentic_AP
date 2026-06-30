import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";

export function useRequireAuth() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) router.replace("/login");
  }, [token, router]);

  return token;
}
