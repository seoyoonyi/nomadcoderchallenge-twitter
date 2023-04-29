import Header from "@/components/Header";
import Tweet from "@/components/Tweet";
import useMutation from "@/lib/client/useMutation";
import { useRouter } from "next/router";
import React, { MouseEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";

interface UploadTweetForm {
  text: {};
}

const Home = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadTweetForm>();

  const [uploadTweet, { loading: tweetsLoading, data: tweetsData }] =
    useMutation(`/api/tweets`);
  const { data: userData, error: userError } = useSWR("/api/users/me");
  const [logoutMutation, { loading: logoutLoaing }] =
    useMutation(`/api/users/logout`);
  const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
    e && e.preventDefault();
    if (logoutLoaing) return;

    logoutMutation(userError);
    router.push("/log-in");
  };

  const onValid: SubmitHandler<UploadTweetForm> = (data) => {
    if (tweetsLoading) return;
    uploadTweet(data);
  };

  useEffect(() => {
    if (userData && !userData.ok) {
      router.replace("/log-in");
    }
  }, [userData, router]);

  useEffect(() => {
    if (tweetsData?.ok) {
      router.push(`/tweets/${tweetsData.tweet.id}`);
    }
  }, [tweetsData, router]);

  if (userError) return <div>Error occurred.</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl min-h-screen mx-auto">
      <Header handleLogout={handleLogout} userData={userData} />
      <div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex justify-between h-12 px-4 mx-auto mt-4"
        >
          <input
            {...register("text", { required: true })}
            required
            name="text"
            type="text"
            className="w-4/5 px-2 pl-5 pr-5 bg-gray-100 rounded-full focus:outline-none focus:ring focus:border-blue-300"
            placeholder="상태 업데이트 게시"
          />
          <button
            className="w-1/5 px-4 py-2 ml-5 text-white bg-blue-500 rounded-full hover:bg-blue-600"
            disabled={tweetsLoading}
          >
            {tweetsLoading ? "업로드 중" : "업로드"}
          </button>
        </form>
        <Tweet />
      </div>
    </div>
  );
};

export default Home;
