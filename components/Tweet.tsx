import React, { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";
import useTweetLike from "@/hooks/useTweetLike";
import { NextPageContext } from "next";
import Item from "./Item";

interface tweetType {
  id: number;
  text: string;
  _count: {
    likes: number;
  };
}

interface TweetProps {
  tweetId: string | string[];
}

const Tweet = () => {
  const { data, isValidating } = useSWR(`/api/tweets`);

  return (
    <div>
      <h2>Tweets</h2>
      <ul>
        {isValidating ? (
          <div>loading</div>
        ) : (
          <ul>
            {data?.tweets?.map(({ id, text, _count: { likes } }: tweetType) => {
              return <Item text={text} hearts={likes} key={id} id={id} />;
            })}
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Tweet;
