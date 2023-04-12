import { User } from "../../../lib/user";
import db from "../../../lib/db";
import { withApiSession } from "../../../lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

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
    return res.status(200).end();
  }
  return res.status(405).end();
}

export default withApiSession(handler);
