import {
    FaFire,
    FaTrophy,
    FaMedal,
    FaStar,
    FaBolt,
    FaCode
}
from "react-icons/fa";

export default function AchievementCards({ dashboard }) {

    const solved = dashboard.profile.totalSolved;

    const streak = dashboard.profile.streak;

    const badges = [

        {
            title:"Daily Streak",
            value:`${streak} Days`,
            icon:<FaFire size={30}/>,
            color:"bg-orange-100 text-orange-600"
        },

        {
            title:"Problems Solved",
            value:solved,
            icon:<FaCode size={30}/>,
            color:"bg-green-100 text-green-600"
        },

        {
            title:"Contest Rating",
            value:dashboard.profile.contestRating,
            icon:<FaTrophy size={30}/>,
            color:"bg-blue-100 text-blue-600"
        },

        {
            title:"Level",
            value:Math.floor((solved*15)/1000)+1,
            icon:<FaStar size={30}/>,
            color:"bg-yellow-100 text-yellow-600"
        },

        {
            title:"Top Ranking",
            value:"#"+dashboard.profile.ranking,
            icon:<FaMedal size={30}/>,
            color:"bg-purple-100 text-purple-600"
        },

        {
            title:"XP",
            value:solved*15,
            icon:<FaBolt size={30}/>,
            color:"bg-sky-100 text-sky-600"
        }

    ];

    return (

        <div>

            <h2 className="text-3xl font-bold mb-6">

                Achievements

            </h2>

            <div className="grid lg:grid-cols-3 gap-6">

                {

                    badges.map((badge,index)=>(

                        <div

                            key={index}

                            className="
                                bg-white
                                rounded-3xl
                                shadow-lg
                                p-8
                                hover:scale-105
                                transition
                            "

                        >

                            <div className={`

                                w-16
                                h-16
                                rounded-full
                                flex
                                items-center
                                justify-center

                                ${badge.color}

                            `}

                            >

                                {badge.icon}

                            </div>

                            <h2 className="mt-6 text-xl font-semibold">

                                {badge.title}

                            </h2>

                            <p className="mt-2 text-3xl font-bold">

                                {badge.value}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}