import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { Post } from "@/types/types";
dotenv.config();

type ResponseData = {
  message: string;
  posts?: Post[];
};

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { tag } = req.query;

  if (!tag || typeof tag !== "string") {
    res
      .status(400)
      .json({ message: "Tag parameter is required and must be a string" });
    return;
  }

  if (!tag || typeof tag !== "string") {
    res
      .status(400)
      .json({ message: "Tag parameter is required and must be a string" });
    return;
  }
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    res.status(500).json({ message: "MONGODB_URI is not defined" });
    return;
  }

  if (!tag || typeof tag !== "string") {
    res.status(400).json({ message: "Tag parameter is required" });
    return;
  }

  const client = new MongoClient(uri);
  let posts: Post[] = [];

  async function main() {
    try {
      await client.connect();
      const result = await client
        .db("StageDb")
        .collection("StageDb")
        .find<Post>({
          tags: { $in: [tag] },
        });
      posts = await result.toArray();

      if (posts.length === 0) {
        return res.status(404).json({
          message: `No posts found with tag: ${tag}`,
          posts: [],
        });
      }
    } catch (e: any) {
      console.error(e);
      throw new Error(e.message);
    } finally {
      await client.close();
    }
  }

  if (req.method === "GET") {
    main()
      .then(() =>
        res.status(200).json({
          message: "Success",
          posts,
        })
      )
      .catch((error) =>
        res.status(500).json({
          message: error.message || "An unexpected error occurred",
        })
      );
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
