export default function AnalyticsGrid({ children }) {

    return (

        <div
            className="
                grid
                xl:grid-cols-2
                gap-8
                mt-8
            "
        >

            {children}

        </div>

    );

}