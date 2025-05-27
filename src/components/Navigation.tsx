import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogposts" },
  { href: "/about", label: "Over mij" },
];

const Navigation = () => {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="w-full flex justify-center gap-4 py-6 mb-8 bg-white/80 backdrop-blur border-b border-[#00A94E]/20 shadow-sm sticky top-0 z-20"
    >
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} passHref legacyBehavior>
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className={`px-4 py-2 rounded-full font-semibold cursor-pointer transition-colors duration-200 ${
              router.pathname === link.href
                ? "bg-[#00A94E] text-white"
                : "text-[#00A94E] hover:bg-[#00A94E]/10"
            }`}
          >
            {link.label}
          </motion.a>
        </Link>
      ))}
    </motion.nav>
  );
};

export default Navigation;
