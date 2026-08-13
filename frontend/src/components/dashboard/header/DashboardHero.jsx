import WelcomeCard from "./WelcomeCard";
import DailyGoalCard from "./DailyGoalCard";
import WeeklyProgress from "./WeeklyProgress";

export default function DashboardHero({ dashboard }) {

    return (

        <div className="space-y-8">

            <WelcomeCard dashboard={dashboard} />

            <div className="grid lg:grid-cols-2 gap-6">

                <DailyGoalCard dashboard={dashboard} />

                <WeeklyProgress dashboard={dashboard} />

            </div>

        </div>

    );

}