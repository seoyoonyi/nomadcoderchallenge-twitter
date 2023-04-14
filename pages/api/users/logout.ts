import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/lib/server/withSession";
import withHandler, { ResponseType } from "@/lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  await req.session.destroy();
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
