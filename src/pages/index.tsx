import { useState, useMemo } from "react";
import TagFilter from "@/components/TagFilter";
import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import Image from "next/image";
import { Post } from "@/types/types";
import Link from "next/link";

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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    if (!posts) return [];
    const tags = posts.flatMap((post) => post.tags || []);
    return Array.from(new Set(tags));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

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

  if (!filteredPosts || filteredPosts.length === 0) {
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
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-6xl font-black text-[#00A94E] mb-16 text-center tracking-tight leading-tight"
        >
          <span className="text-gray-900">Mijn ervaringen bij </span>DEME
        </motion.h1>

        <TagFilter
          tags={allTags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 group overflow-hidden"
            >
              {post.imageUrl && (
                <div className="relative h-[250px] overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#00A94E] transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-base line-clamp-3">
                  {post.content?.slice(0, 200)}
                  {post.content && post.content.length > 200 ? "..." : ""}
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-4 py-1 bg-[#00A94E]/10 text-[#00A94E] rounded-full text-xs font-semibold hover:bg-[#00A94E] hover:text-white transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedTag(tag)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex justify-end">
                  <Link href={`/post/${post._id}`}>
                    <button className="px-6 py-2 bg-[#00A94E] text-white rounded-full text-sm font-semibold hover:bg-[#008a3f] transition-colors duration-300 shadow-sm hover:shadow-md flex items-center gap-2">
                      Read More
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                    </button>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Posts;
