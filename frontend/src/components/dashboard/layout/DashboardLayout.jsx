export default function DashboardLayout({

    sidebar,

    children

}) {

    return (

        <div
            className="
                max-w-[1500px]
                mx-auto
                px-6
                pt-32
                pb-20
            "
        >

            <div
                className="
                    grid
                    lg:grid-cols-[350px_1fr]
                    gap-8
                    items-start
                "
            >

                {sidebar}

                {children}

            </div>

        </div>

    );

}