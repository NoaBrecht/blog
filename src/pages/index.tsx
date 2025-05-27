import { GetServerSideProps } from "next";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/types";
import StageInfo from "@/components/StageInfo";

interface HomeProps {
  posts?: Post[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
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

const Home = ({ posts, error }: HomeProps) => {
  const latestPost = posts && posts.length > 0 ? posts[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-5xl font-extrabold text-[#00A94E] mb-4"
        >
          Welkom op mijn DEME Stage Blog!
        </motion.h1>
        <p className="text-lg text-gray-700 mb-6">
          Op deze blog deel ik mijn ervaringen, inzichten en avonturen tijdens
          mijn stage bij{" "}
          <span className="font-semibold text-[#00A94E]">DEME</span>.
        </p>
        <StageInfo />
        <Link href="/blogs">
          <button className="px-8 py-3 bg-[#00A94E] text-white rounded-full font-semibold hover:bg-[#008a3f] transition-colors duration-300">
            Bekijk de Blogposts
          </button>
        </Link>
      </div>

      {/* Nieuwste Blogpost */}
      {latestPost && (
        <section className="max-w-2xl mx-auto mb-12 w-full">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Nieuwste Blogpost
          </h2>
          <motion.article
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
          >
            {latestPost.imageUrl && (
              <div className="relative h-[200px] overflow-hidden">
                <Image
                  src={latestPost.imageUrl}
                  alt={latestPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{latestPost.title}</h3>
              <p className="text-gray-600 mb-4">
                {latestPost.content?.slice(0, 150)}
                {latestPost.content && latestPost.content.length > 150
                  ? "..."
                  : ""}
              </p>
              <Link href={`/post/${latestPost._id}`}>
                <button className="px-5 py-2 bg-[#00A94E] text-white rounded-full text-sm font-semibold hover:bg-[#008a3f] transition-colors duration-300">
                  Lees Meer
                </button>
              </Link>
            </div>
          </motion.article>
        </section>
      )}
    </motion.div>
  );
};

export default Home;
