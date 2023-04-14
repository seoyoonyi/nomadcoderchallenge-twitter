import useMutation from "@/lib/client/useMutation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const Header = () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/users/me");
  const [logoutMutation, { loading }] = useMutation(`/api/users/logout`);
  const handleLogout = async ({ e, data }: any) => {
    e && e.preventDefault();
    if (loading) return;

    try {
      await logoutMutation(data);
      router.push("/log-in");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  useEffect(() => {
    if (error) {
      router.replace("/create-account");
    }
  }, [router, error]);

  return (
    <div>
      {data && data.ok ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <Link href={"/log-in"}>로그인</Link>
      )}
    </div>
  );
};
export default Header;
