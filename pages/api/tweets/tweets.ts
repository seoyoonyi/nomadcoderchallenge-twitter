import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

type Tweet = {
  text: string;
};
type tweetResponseType = Tweet[] | Tweet;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tweetResponseType>
) {
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany();
    res.status(200).json(tweets);
  }

  if (req.method === "POST") {
    const { text, userId } = JSON.parse(req.body);
    const tweet = await db.tweet.create({
      data: {
        text,
        userId,
      },
    });
    res.status(201).json(tweet);
  }
  return res.status(404).end();
}

export default withApiSession(handler);
