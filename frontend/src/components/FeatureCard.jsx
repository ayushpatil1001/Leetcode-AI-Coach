import { motion } from "framer-motion";

export default function FeatureCard({
  title,
  description,
  icon,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -10
      }}
      className="bg-white rounded-3xl p-8 shadow-lg"
    >
      <div className="text-sky-500 text-4xl mb-4">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-3">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </motion.div>
  );
}