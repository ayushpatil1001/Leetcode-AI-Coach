import CountUp from "react-countup";

import { motion } from "framer-motion";

export default function DashboardHeader({

    dashboard

}){

    const profile =
        dashboard.profile.matchedUser.profile;

    const solved =
        dashboard.profile.matchedUser.submitStats.acSubmissionNum[0].count;

    return(

        <motion.div

            initial={{opacity:0,y:-20}}

            animate={{opacity:1,y:0}}

            className="
                bg-gradient-to-r
                from-sky-600
                via-blue-600
                to-indigo-700
                rounded-3xl
                p-10
                text-white
                shadow-xl
            "

        >

            <h1 className="text-4xl font-bold">

                Welcome back,

                {profile.realName || "Coder"}

                👋

            </h1>

            <p className="mt-3 opacity-90">

                Keep pushing your limits today.

            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">

                <div>

                    <h3 className="text-sm opacity-80">

                        Total Solved

                    </h3>

                    <p className="text-4xl font-bold">

                        <CountUp

                            end={solved}

                            duration={2}

                        />

                    </p>

                </div>

                <div>

                    <h3 className="text-sm opacity-80">

                        Reputation

                    </h3>

                    <p className="text-4xl font-bold">

                        <CountUp

                            end={profile.reputation}

                            duration={2}

                        />

                    </p>

                </div>

                <div>

                    <h3 className="text-sm opacity-80">

                        Ranking

                    </h3>

                    <p className="text-4xl font-bold">

                        #

                        <CountUp

                            end={profile.ranking}

                            duration={2}

                        />

                    </p>

                </div>

            </div>

        </motion.div>

    );

}