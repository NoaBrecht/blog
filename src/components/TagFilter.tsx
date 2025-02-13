import { motion } from "framer-motion";

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

const TagFilter = ({ tags, selectedTag, onTagSelect }: TagFilterProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-wrap gap-3 justify-center mb-8"
    >
      <button
        onClick={() => onTagSelect(null)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
          selectedTag === null
            ? "bg-[#00A94E] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        All Posts
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedTag === tag
              ? "bg-[#00A94E] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          #{tag}
        </button>
      ))}
    </motion.div>
  );
};

export default TagFilter;
