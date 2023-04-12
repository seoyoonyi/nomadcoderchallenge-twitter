import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

export const Home = () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/users/me");
  useEffect(() => {
    if (error) {
      router.replace("/create-account");
    }
  }, [router, error]);
  if (!data) {
    return <div />;
  }
  return (
    <div>
      <h1>Welcome {data?.name}!</h1>
      <h3>Your email is: {data?.email}</h3>
    </div>
  );
};
