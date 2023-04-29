import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "next-app-session",
  password: "ThisShouldBeAVeryLongText12345!!!",
  secure: process.env.NODE_ENV === "production",
};

export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

/* 


export function withApiSession(fn: NextApiHandler) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

//ssr에서 req.session 접근가능하게 해줌
export function withSsrSession<
  P extends {
    [key: string]: unknown;
  }
>(
  fn: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(fn, cookieOptions);
}


*/
