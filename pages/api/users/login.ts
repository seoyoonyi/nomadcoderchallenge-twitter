import { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/server/db";
import { withApiSession } from "@/lib/server/withSession";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { User } from "@/lib/server/user";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).end();
    }

    const userInstance = new User(user.email, user.password);
    const passwordMatch = await userInstance.comparePasswords(password);

    if (!passwordMatch) {
      return res.status(401).end();
    }

    req.session.user = {
      id: user.id,
    };
    await req.session.save();
    res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
