import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { Post } from "@/types/types";
import auth from "@/middleware/auth";
dotenv.config();

type ResponseData = {
  message: string;
  posts?: Post[];
};

const handler = (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    res.status(500).json({ message: "MONGODB_URI is not defined" });
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
        .find<Post>({});
      posts = await result.toArray();
    } catch (e: any) {
      console.error(e);
    } finally {
      await client.close();
    }
  }
  if (req.method === "GET") {
    main()
      .then(() => res.status(200).json({ message: "Success", posts }))
      .catch((error) =>
        res
          .status(500)
          .json({ message: error.message || "An unexpected error occurred" })
      );
  } else if (req.method === "POST") {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    async function addPost() {
      try {
        await client.connect();
        const result = await client
          .db("StageDb")
          .collection("StageDb")
          .insertOne({ ...req.body, createdAt: new Date() });
        if (result.acknowledged) {
          res.status(201).json({ message: "Post created successfully" });
        } else {
          res.status(500).json({ message: "Failed to create post" });
        }
      } catch (e: any) {
        console.error(e);
        res
          .status(500)
          .json({ message: e.message || "An unexpected error occurred" });
      } finally {
        await client.close();
      }
    }

    addPost();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default auth(handler);
