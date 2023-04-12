import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Tweets from "./api/tweets/tweets";

const Home = () => {
  const router = useRouter();
  const { data, error } = useSWR("/api/users/me");
  const [newTweet, setNewTweet] = useState("");
  const { mutate } = useSWRConfig();

  const handleTweetSubmit = async () => {
    // POST newTweet to API
    await fetch("/api/tweets", {
      method: "POST",
      body: JSON.stringify({ content: newTweet }),
    });
    mutate("/api/tweets"); // Update SWR cache to reflect new tweet
    setNewTweet("");
  };

  useEffect(() => {
    if (error) {
      router.replace("/log-in");
    }
  }, [router, error]);

  if (!data) {
    return <div />;
  }
  return (
    <div>
      <h1>Welcome {data?.name}!</h1>
      <h3>Your email is: {data?.email}</h3>
      <input
        type="text"
        value={newTweet}
        onChange={(e) => setNewTweet(e.target.value)}
      />
      <button onClick={handleTweetSubmit}>Tweet</button>
      <Tweets />
    </div>
  );
};

export default Home;
