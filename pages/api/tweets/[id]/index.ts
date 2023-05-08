import db from "@/lib/server/db";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/lib/server/withSession";
import withHandler, {
  ResponseData,
  ResponseType,
} from "@/lib/server/withHandler";

async function handler<T extends ResponseData>(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType<T>>
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
  const terms = tweet?.user.name.split(" ");

  const relatedTweet = await db.tweet.findMany({
    where: {
      OR: terms?.map((word: string) => ({
        user: {
          name: {
            contains: word,
          },
        },
      })),
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

  res.json({ ok: true, data: { tweet, likes, relatedTweet } });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
