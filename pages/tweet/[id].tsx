import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { useSWRConfig } from "swr";
import fetcher from "../api/fetcher";

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
  const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/like`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // mutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
    toggleFav({});
  };

  const handleLike = async () => {
    // Update like status in the database
    await fetcher(`/api/tweets/${id}/like`, { method: "PUT" });
    mutate(); // Update SWR cache to reflect like status
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
