import db from "../../../lib/db";
import { User } from "../../../lib/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
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
    return res.status(201).end();
  }
  return res.status(405).end();
}
