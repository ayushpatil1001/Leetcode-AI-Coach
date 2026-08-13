import { motion } from "framer-motion";

export default function FeatureCard({
  title,
  description,
  icon,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.04,
        y: -8
      }}
      transition={{ duration: 0.4 }}
      className="liquid-glass liquid-glass-hover rounded-3xl p-8 group overflow-hidden"
    >
      <motion.div
        whileHover={{ scale: 1.15, rotate: 8 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="text-sky-500 text-4xl mb-4 p-3 bg-sky-50 rounded-2xl w-fit border border-sky-100/80 shadow-2xs"
      >
        {icon}
      </motion.div>

      <h3 className="text-2xl font-extrabold text-slate-800 mb-3">
        {title}
      </h3>

      <p className="text-slate-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}