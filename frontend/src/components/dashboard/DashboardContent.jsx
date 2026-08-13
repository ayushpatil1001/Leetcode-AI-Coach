import DashboardHeader from "./DashboardHeader";

import StatsCards from "./StatsCards";

import SolvedChart from "./SolvedChart";

import ContributionHeatmap from "./ContributionHeatmap";

import TopicStats from "./TopicStats";

import LanguageStats from "./LanguageStats";

import ContestChart from "./ContestChart";

import Badges from "./Badges";

import RecentActivity from "./RecentActivity";

import AIInsights from "./AIInsights";

export default function DashboardContent({

    dashboard

}){

    return(

        <>

            <DashboardHeader

                dashboard={dashboard}

            />

            <StatsCards

                dashboard={dashboard}

            />

            <SolvedChart

                dashboard={dashboard}

            />

            <ContributionHeatmap

                dashboard={dashboard}

            />

            <div
                className="
                    grid
                    lg:grid-cols-2
                    gap-8
                    mt-8
                "
            >

                <TopicStats

                    dashboard={dashboard}

                />

                <LanguageStats

                    dashboard={dashboard}

                />

            </div>

            <ContestChart

                dashboard={dashboard}

            />

            <Badges

                dashboard={dashboard}

            />

            <RecentActivity

                dashboard={dashboard}

            />

            <AIInsights

                dashboard={dashboard}

            />

        </>

    );

}