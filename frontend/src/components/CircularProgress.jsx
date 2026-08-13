export default function CircularProgress({

    percentage,
    title

}) {

    const radius = 65;

    const circumference = 2 * Math.PI * radius;

    const offset =
        circumference -
        percentage / 100 * circumference;

    return (

        <div className="flex flex-col items-center">

            <svg
                width="170"
                height="170"
            >

                <circle
                    cx="85"
                    cy="85"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="12"
                    fill="none"
                />

                <circle
                    cx="85"
                    cy="85"
                    r={radius}
                    stroke="#0284c7"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 85 85)"
                />

                <text
                    x="85"
                    y="90"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="bold"
                >

                    {percentage}%

                </text>

            </svg>

            <h2 className="mt-4 text-xl font-semibold">

                {title}

            </h2>

        </div>

    );

}