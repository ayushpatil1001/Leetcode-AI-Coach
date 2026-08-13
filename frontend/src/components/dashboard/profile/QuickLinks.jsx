import {

    User,

    Trophy,

    Brain,

    BookOpen

} from "lucide-react";

import { Link } from "react-router-dom";

export default function QuickLinks(){

    const links=[

        {

            icon:<User size={20}/>,

            text:"Profile",

            path:"/profile"

        },

        {

            icon:<Brain size={20}/>,

            text:"AI Coach",

            path:"/coach"

        },

        {

            icon:<BookOpen size={20}/>,

            text:"Roadmap",

            path:"/roadmap"

        },

        {

            icon:<Trophy size={20}/>,

            text:"Dashboard",

            path:"/dashboard"

        }

    ];

    return(

        <div
            className="
                bg-white
                rounded-3xl
                shadow-xl
                border
                border-slate-200
                p-6
            "
        >

            <h2 className="text-xl font-bold mb-5">

                Quick Links

            </h2>

            <div className="space-y-3">

                {

                    links.map(link=>(

                        <Link

                            key={link.text}

                            to={link.path}

                            className="
                                flex
                                items-center
                                gap-3
                                p-4
                                rounded-xl
                                hover:bg-sky-50
                                transition
                            "

                        >

                            {link.icon}

                            {link.text}

                        </Link>

                    ))

                }

            </div>

        </div>

    );

}