import db from "../../../../lib/db";
import { withApiSession } from "../../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

type Tweet = {
  text: string;
};
type tweetResponseType = Tweet[] | Tweet;

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<tweetResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await db.like.findFirst({
    where: {
      tweetId: +id.toString(),
      userId: user?.id,
    },
  });
  if (alreadyExists) {
    await db.like.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }
  res.json({ ok: true } as unknown as tweetResponseType);
}

export default withApiSession(handler);
