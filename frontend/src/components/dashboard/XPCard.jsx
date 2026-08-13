import {
CircularProgressbar,
buildStyles
}
from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function XPCard({ dashboard }) {

    const solved=dashboard.profile.totalSolved;

    const xp=solved*15;

    const level=Math.floor(xp/1000)+1;

    const current=xp%1000;

    const percentage=(current/1000)*100;

    return(

        <div
            className="
                bg-white
                rounded-3xl
                shadow-xl
                p-10
            "
        >

            <div className="grid lg:grid-cols-2 gap-10">

                <div>

                    <h2 className="text-3xl font-bold">

                        Experience

                    </h2>

                    <p className="mt-4 text-slate-600">

                        Every solved problem earns XP.

                        Hard problems earn even more.

                    </p>

                    <div className="mt-8">

                        <h1 className="text-6xl font-bold text-sky-600">

                            {xp}

                        </h1>

                        <p className="text-slate-500">

                            Total XP

                        </p>

                    </div>

                </div>

                <div className="flex justify-center">

                    <div className="w-48">

                        <CircularProgressbar

                            value={percentage}

                            text={`Lv ${level}`}

                            styles={buildStyles({

                                pathColor:"#0ea5e9",

                                textColor:"#0f172a",

                                trailColor:"#e2e8f0"

                            })}

                        />

                    </div>

                </div>

            </div>

        </div>

    );

}