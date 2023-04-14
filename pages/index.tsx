import Header from "@/components/Header";
import Tweet from "@/components/Tweet";
import useMutation from "@/lib/client/useMutation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { useSWRConfig } from "swr";
interface UploadTweetForm {
  id: number;
  text: string;
  likes: boolean;
}

const Home = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const [uploadTweet, { loading, data }] = useMutation(`/api/tweets`);

  const onValid = (data: any) => {
    if (loading) return;
    uploadTweet(data);
  };

  useEffect(() => {
    if (data?.ok) {
      router.replace(`/tweets/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("text", { required: true })}
          required
          name="text"
          type="text"
        />
        <button>{loading ? "Loading..." : "Upload Tweet"} </button>
      </form>
      <Tweet />
    </div>
  );
};

export default Home;
