import { motion } from "framer-motion";

import Badges from "./Badges";

import LanguageStats from "./LanguageStats";

export default function DashboardSidebar({

    dashboard

}){

    const user =
        dashboard.profile.matchedUser;

    const profile =
        user.profile;

    const contest =
        dashboard.contest.userContestRanking;

    return(

        <motion.div

            initial={{
                opacity:0,
                x:-20
            }}

            animate={{
                opacity:1,
                x:0
            }}

            className="
                sticky
                top-28
                space-y-6
            "

        >

            <div
                className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    p-8
                    text-center
                "
            >

                <img

                    src={
                        profile.userAvatar
                    }

                    alt=""

                    className="
                        w-32
                        h-32
                        rounded-full
                        mx-auto
                        border-4
                        border-sky-200
                    "

                />

                <h2 className="text-2xl font-bold mt-5">

                    {profile.realName}

                </h2>

                <p className="text-slate-500">

                    @{user.username}

                </p>

                <div className="mt-8 space-y-4">

                    <div className="flex justify-between">

                        <span>Global Rank</span>

                        <b>

                            #

                            {contest?.globalRanking}

                        </b>

                    </div>

                    <div className="flex justify-between">

                        <span>Rating</span>

                        <b>

                            {Math.round(contest?.rating||0)}

                        </b>

                    </div>

                    <div className="flex justify-between">

                        <span>Country</span>

                        <b>

                            {profile.countryName}

                        </b>

                    </div>

                    <div className="flex justify-between">

                        <span>Company</span>

                        <b>

                            {profile.company||"--"}

                        </b>

                    </div>

                    <div className="flex justify-between">

                        <span>School</span>

                        <b>

                            {profile.school||"--"}

                        </b>

                    </div>

                </div>

            </div>

            <Badges dashboard={dashboard}/>

            <LanguageStats dashboard={dashboard}/>

        </motion.div>

    );

}