export default function SectionCard({

    title,

    subtitle,

    children

}){

    return(

        <section
            className="
                bg-white
                rounded-3xl
                border
                border-slate-200
                shadow-xl
                p-8
            "
        >

            <div className="mb-6">

                <h2 className="text-2xl font-bold">

                    {title}

                </h2>

                {subtitle && (

                    <p className="text-slate-500 mt-1">

                        {subtitle}

                    </p>

                )}

            </div>

            {children}

        </section>

    );

}