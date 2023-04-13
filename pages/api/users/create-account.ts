import db from "@/lib/server/db";
import { User } from "@/lib/server/user";
import withHandler, { ResponseType } from "@/lib/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const userInfo = new User(email, password);

    await userInfo.encryptPassword();

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(200).end();
    }

    await db.user.create({
      data: {
        name,
        email,
        password: userInfo.getPassword(),
      },
    });

    res.json({
      ok: true,
    });
  }
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
