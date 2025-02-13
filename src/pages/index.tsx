import { GetServerSideProps } from "next";
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            No Posts Found
          </h1>
          <p className="text-gray-600">Check back later for new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">
          Blog Posts
        </h1>
        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {post.title}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                {post.content}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {post.code && (
                <pre className="bg-gray-900 text-gray-100 p-6 mt-4 rounded-lg overflow-x-auto">
                  <code className="font-mono text-sm">{post.code}</code>
                </pre>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
