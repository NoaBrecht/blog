import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import { Post } from "@/types/types";
import auth from "@/middleware/auth";
dotenv.config();

type ResponseData = {
  message: string;
  post?: Post;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    res.status(500).json({ message: "MONGODB_URI is not defined" });
    return;
  }
  const client = new MongoClient(uri);

  if (req.method === "GET") {
    try {
      await client.connect();
      const post = await client
        .db("StageDb")
        .collection("StageDb")
        .find<Post>({})
        .sort({ createdAt: -1 })
        .limit(1)
        .next();

      if (!post) {
        res.status(404).json({ message: "No posts found" });
        return;
      }

      res.status(200).json({ message: "Success", post });
    } catch (e: any) {
      console.error(e);
      res
        .status(500)
        .json({ message: e.message || "An unexpected error occurred" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default auth(handler);
