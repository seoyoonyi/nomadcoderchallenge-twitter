import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseData {
  [key: string]: any;
}

export interface ResponseType<T extends ResponseData> {
  ok?: boolean;
  error?: string;
  data?: T;
}

type method = "GET" | "POST" | "DELETE";

interface ConfigType<T extends ResponseData> {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse<ResponseType<T>>) => void;
  isPrivate?: boolean;
}

export default function withHandler<T extends ResponseData>({
  methods,
  isPrivate = true,
  handler,
}: ConfigType<T>) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType<T>>
  ): Promise<void> {
    if (req.method && !methods.includes(req.method as method)) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Plz log in." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  };
}
