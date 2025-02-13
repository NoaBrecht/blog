import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import Image from "next/image";
import { Post } from "@/types/types";

interface PostsProps {
  posts?: Post[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PostsProps> = async (
  context
) => {
  try {
    const host = context.req.headers.host || "localhost:3000";
    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const res = await fetch(`${protocol}://${host}/api/posts`);
    if (!res.ok) {
      throw new global.Error(`HTTP error! status: ${res.status}`);
    }
    const { posts } = await res.json();

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return {
      props: {
        error: "Failed to load posts. Please try again later.",
        posts: [],
      },
    };
  }
};

const Posts = ({ posts, error }: PostsProps) => {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100"
      >
        <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full mx-4 backdrop-blur-sm bg-white/80">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100"
      >
        <div className="text-center p-12 bg-white rounded-xl shadow-lg max-w-md w-full mx-4 backdrop-blur-sm bg-white/80">
          <h1 className="text-3xl font-bold text-[#00A94E] mb-4">
            No Posts Yet
          </h1>
          <p className="text-gray-600">Check back soon for exciting content!</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-7xl font-black text-[#00A94E] mb-20 text-center tracking-tight leading-tight"
        >
          Latest <span className="text-gray-900">Posts</span>
        </motion.h1>
        <div className="grid gap-12">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg p-12 hover:shadow-2xl transition-all duration-500 border border-gray-100 group"
            >
              {post.imageUrl && (
                <div className="mb-8 overflow-hidden rounded-2xl">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={1200}
                    height={630}
                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight group-hover:text-[#00A94E] transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8 text-xl font-light">
                {post.content}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-6 py-2 bg-[#00A94E]/10 text-[#00A94E] rounded-full text-sm font-semibold hover:bg-[#00A94E] hover:text-white transition-all duration-300 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {post.code && (
                <motion.pre
                  whileHover={{ scale: 1.01 }}
                  className="bg-gray-900 text-gray-100 p-8 rounded-xl overflow-x-auto shadow-inner"
                >
                  <code className="font-mono text-sm">{post.code}</code>
                </motion.pre>
              )}
              <div className="mt-8 flex justify-end">
                <button className="px-8 py-3 bg-[#00A94E] text-white rounded-full font-semibold hover:bg-[#008a3f] transition-colors duration-300 shadow-md hover:shadow-lg">
                  Read More
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Posts;
