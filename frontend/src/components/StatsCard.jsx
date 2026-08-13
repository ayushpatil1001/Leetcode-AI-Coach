import { motion } from "framer-motion";

export default function StatCard({
    title,
    value,
    color,
    icon
}) {

    return (

        <motion.div
            whileHover={{
                y: -5
            }}
            className="
                bg-white
                rounded-3xl
                shadow-lg
                p-7
                border
                border-slate-100
            "
        >

            <div className="flex justify-between">

                <div>

                    <p className="text-slate-500">

                        {title}

                    </p>

                    <h2 className="text-4xl font-bold mt-4">

                        {value}

                    </h2>

                </div>

                <div
                    className={`
                        w-16
                        h-16
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        text-3xl
                        ${color}
                    `}
                >

                    {icon}

                </div>

            </div>

        </motion.div>

    );

}