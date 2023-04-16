import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/server/db";
import { withApiSession } from "@/lib/server/withSession";
import withHandler, { ResponseType } from "@/lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;

  const profile = await db.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  res.json({
    ok: true,
    ...profile,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
