import React, { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import useSWR from "swr";
import { NextPageContext } from "next";
import Item from "./Item";

interface tweetType {
  id: number;
  text: string;
  _count: {
    likes: number;
  };
  user: {
    name: string;
  };
}

interface TweetProps {
  tweetId: string | string[];
}

const Tweet = () => {
  const { data, isValidating } = useSWR(`/api/tweets`);

  return (
    <ul className="w-full mt-5">
      {isValidating ? (
        <div>loading</div>
      ) : (
        <ul>
          {data?.tweets?.map(
            ({ id, text, _count: { likes }, user: { name } }: tweetType) => {
              return (
                <Item text={text} hearts={likes} key={id} id={id} name={name} />
              );
            }
          )}
        </ul>
      )}
    </ul>
  );
};

export default Tweet;
