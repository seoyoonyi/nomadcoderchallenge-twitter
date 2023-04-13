import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import useMutation from "@/lib/client/useMutation";

// interface ItemDetailResponse {
//     ok: boolean;
//     tweets: ProductWithUser;
//     relatedProducts: Product[];
//     isLiked: boolean;
//   }

const TweetDetail = () => {
  const router = useRouter();

  //   const { data: tweet, mutate } = useSWR(`/api/tweets/${id}`, fetcher);
  const { data, mutate: boundMutate } = useSWR(
    router.query.id ? `/api/tweets/${router.query.id}` : null
  );
  const { tweet } = data;
  const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/like`);
  const handleLike = () => {
    if (!data) return;
    boundMutate((prev: any) => prev && { ...prev, likes: !prev.likes }, false);
    toggleFav({});
  };

  return (
    <div>
      <h1>Tweet Detail Page</h1>
      {tweet ? (
        <>
          <p>Tweet content: {tweet.content}</p>
          <p>Number of likes: {tweet.likes}</p>
          <button onClick={handleLike}>Like</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TweetDetail;
