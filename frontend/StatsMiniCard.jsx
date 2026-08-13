const colors = {

    sky:"bg-sky-50",

    blue:"bg-blue-50",

    emerald:"bg-emerald-50",

    violet:"bg-violet-50"

};

export default function StatsMiniCard({

    title,

    value,

    color="sky"

}){

    return(

        <div
            className={`
                rounded-2xl
                p-5
                ${colors[color]}
            `}
        >

            <p className="text-slate-500">

                {title}

            </p>

            <h2 className="text-2xl font-bold mt-2">

                {value}

            </h2>

        </div>

    );

}