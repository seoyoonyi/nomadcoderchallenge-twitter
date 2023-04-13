import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/server/db";
import { withApiSession } from "@/lib/server/withSession";
import withHandler, { ResponseType } from "@/lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const tweets = await db.tweet.findMany({
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    res.json({
      ok: true,
      tweets,
    });
  }

  if (req.method === "POST") {
    const {
      body: { text },
      session: { user },
    } = req;
    const tweet = await db.tweet.create({
      data: {
        text,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      tweet,
    });
  }
}
export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
