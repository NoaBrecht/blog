import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import Image from "next/image";
import { Post } from "@/types/types";
import CodeBlock from "@/components/codeblock";
import Link from "next/link";

interface PostProps {
  post?: Post;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<PostProps> = async (
  context
) => {
  try {
    const { id } = context.params!;
    const host = context.req.headers.host || "localhost:3000";
    const protocol = context.req.headers["x-forwarded-proto"] || "http";
    const res = await fetch(`${protocol}://${host}/api/posts/${id}`);
    if (!res.ok) {
      throw new global.Error(`HTTP error! status: ${res.status}`);
    }
    const { post } = await res.json();

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return {
      props: {
        error: "Failed to load post. Please try again later.",
      },
    };
  }
};

const PostPage = ({ post, error }: PostProps) => {
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

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100"
      >
        <div className="text-center p-12 bg-white rounded-xl shadow-lg max-w-md w-full mx-4 backdrop-blur-sm bg-white/80">
          <h1 className="text-3xl font-bold text-[#00A94E] mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600">
            The requested post could not be found.
          </p>
          <Link href="/">
            <button className="mt-6 px-6 py-2 bg-[#00A94E] text-white rounded-full text-sm font-semibold hover:bg-[#008a3f] transition-colors duration-300 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto">
              Back to Posts
            </button>
          </Link>
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
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.article
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
        >
          {post.imageUrl && (
            <div className="relative h-[500px] overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 bg-[#00A94E]/10 text-[#00A94E] rounded-full text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-8">
              <p className="whitespace-pre-wrap break-words">{post.content}</p>
            </div>

            {post.code && (
              <div className="mt-8">
                <CodeBlock code={post.code} />
              </div>
            )}

            <div className="mt-8 flex justify-start">
              <Link href="/">
                <button className="px-6 py-2 bg-[#00A94E] text-white rounded-full text-sm font-semibold hover:bg-[#008a3f] transition-colors duration-300 shadow-sm hover:shadow-md flex items-center gap-2">
                  <svg
                    className="w-4 h-4 transform rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  Back to Posts
                </button>
              </Link>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
};

export default PostPage;
