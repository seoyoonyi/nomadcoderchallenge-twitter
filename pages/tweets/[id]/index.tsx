import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import useMutation from "@/lib/client/useMutation";

const TweetDetail = () => {
  const router = useRouter();

  const {
    data,
    mutate: boundMutate,
    isValidating,
  } = useSWR(router.query.id ? `/api/tweets/${router.query.id}` : null);
  const [toggleLike] = useMutation(`/api/tweets/${router.query.id}/like`);

  const handleLike = async () => {
    if (!data) return;
    boundMutate(
      (prev: { likes: any }) => prev && { ...prev, likes: !prev.likes },
      false
    );
    toggleLike({});
  };
  console.log("data", data);

  return (
    <div>
      <p>Router query id: {router.query.id}</p>

      <h1>Tweet Detail Page</h1>
      {isValidating ? (
        <p>Loading...</p>
      ) : (
        <>
          {data && data.tweet && (
            <>
              <p>Tweet content: {data.tweet.text}</p>

              <button onClick={handleLike}>
                {data?.likes ? "UnLike" : "Like"}
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TweetDetail;
