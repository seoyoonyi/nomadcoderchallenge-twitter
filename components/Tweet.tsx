import React from "react";
import { useRouter } from "next/router";

import useSWR from "swr";
import useMutation from "@/lib/client/useMutation";

interface tweetType {
  id: number;
  text: string;
  likes: boolean;
}

const Tweet = () => {
  const router = useRouter();

  const { data } = useSWR(`/api/tweets`);

  if (!data) {
    return <p>Loading...</p>;
  }

  console.log("tweet", data);

  return (
    <div>
      <h2>Tweets</h2>
      <ul>
        {data?.tweets?.map((tweet: tweetType) => (
          <li key={tweet.id}>
            <p>Tweet content: {tweet.text}</p>
            <p>Number of likes: {tweet.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tweet;
