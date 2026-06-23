import { motion } from "framer-motion";

const snippets = [
  "O(n)",
  "HashMap",
  "DFS()",
  "Binary Search",
  "Two Pointers",
  "DP[i]",
  "Stack<>",
  "Queue<>",
];

export default function FloatingCodes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {snippets.map((item, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 100,
            x: Math.random() * window.innerWidth,
          }}
          animate={{
            opacity: [0.2, 0.7, 0.2],
            y: -800,
          }}
          transition={{
            duration: 12 + Math.random() * 10,
            repeat: 10,
            delay: index,
          }}
          className="absolute text-sky-200 font-bold text-2xl"
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}