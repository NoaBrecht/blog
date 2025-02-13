import { NextApiRequest, NextApiResponse } from "next";

const auth =
  (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
      const token = req.headers.authorization?.split(" ")[1];
      const validToken = process.env.BEARER_TOKEN;

      if (!token || token !== validToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    return handler(req, res);
  };

export default auth;
