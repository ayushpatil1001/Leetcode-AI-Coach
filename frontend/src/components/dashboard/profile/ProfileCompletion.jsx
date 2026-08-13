import { motion } from "framer-motion";

export default function ProfileCompletion({ percentage = 82 }) {

    return (

        <div className="mt-8">

            <div className="flex justify-between mb-2">

                <span className="font-medium">

                    Profile Completion

                </span>

                <span>

                    {percentage}%

                </span>

            </div>

            <div className="w-full h-3 rounded-full bg-slate-200">

                <motion.div

                    initial={{ width:0 }}

                    animate={{ width:`${percentage}%` }}

                    transition={{
                        duration:1.2
                    }}

                    className="
                        h-3
                        rounded-full
                        bg-gradient-to-r
                        from-sky-500
                        to-blue-600
                    "

                />

            </div>

        </div>

    );

}