import React from "react";
import useSWR from "swr";
import { fetcher } from "../api/fetcher";

const Tweet = () => {
  const { data: tweets, error } = useSWR("/api/tweets", fetcher);

  if (error) {
    return <p>Error fetching tweets</p>;
  }

  if (!tweets) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Tweets</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <p>Tweet content: {tweet.content}</p>
            <p>Number of likes: {tweet.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tweet;
