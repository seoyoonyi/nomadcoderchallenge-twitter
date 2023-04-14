import db from "@/lib/server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/lib/server/withSession";
import withHandler, { ResponseType } from "@/lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const tweet = await db.tweet.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  //   const terms = tweets?.name.split(" ").map((word) => ({
  //     name: {
  //       contains: word,
  //     },
  //   }));
  const relatedTweet = await db.tweet.findMany({
    where: {
      //   OR: terms,
      AND: {
        id: {
          not: tweet?.id,
        },
      },
    },
  });

  const likes = Boolean(
    await db.like.findFirst({
      where: {
        tweetId: tweet?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({ ok: true, tweet, likes, relatedTweet });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
