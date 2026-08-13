export default function ContributionPlaceholder() {

    return (

        <div
            className="
                bg-white
                rounded-3xl
                shadow-lg
                p-8
            "
        >

            <h2
                className="
                    text-2xl
                    font-bold
                    mb-8
                "
            >

                Yearly Contributions

            </h2>

            <div
                className="
                    grid
                    grid-cols-20
                    gap-2
                "
            >

                {

                    [...Array(365)].map((_,i)=>(

                        <div

                            key={i}

                            className={`
                                w-3
                                h-3
                                rounded-sm

                                ${
                                    Math.random()>0.75

                                    ?

                                    "bg-sky-500"

                                    :

                                    "bg-slate-200"
                                }

                            `}

                        />

                    ))

                }

            </div>

            <p className="mt-6 text-slate-500">

                Live contribution graph will appear after
                Phase 3 integration.

            </p>

        </div>

    );

}