import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
}

const CodeBlock = ({ code }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isClamped, setIsClamped] = useState(true);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div className="relative bg-gray-900 rounded-lg overflow-hidden mb-6">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
        <span className="text-gray-400 text-xs">Code</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className="px-3 py-1 text-xs font-medium text-gray-300 hover:text-white transition-colors duration-200"
        >
          <AnimatePresence mode="wait">
            {isCopied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <div className="flex flex-col items-center">
          <motion.div className="font-mono text-sm text-gray-100 w-full">
            <div className="inline">
              {code.slice(0, 300)}
              <AnimatePresence mode="wait" initial={false}>
                {isClamped ? (
                  <motion.span
                    key="dots"
                    className="inline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ...
                  </motion.span>
                ) : (
                  <motion.span
                    key="content"
                    className="inline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {code.slice(300)}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          {code.length > 300 && (
            <motion.button
              onClick={() => setIsClamped(!isClamped)}
              className="mt-4 text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isClamped ? (
                <>
                  Show more
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              ) : (
                <>
                  Show less
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </>
              )}
            </motion.button>
          )}
        </div>
      </pre>
    </motion.div>
  );
};

export default CodeBlock;
