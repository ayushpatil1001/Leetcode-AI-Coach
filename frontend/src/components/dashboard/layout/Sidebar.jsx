import ProfileCard from "../profile/ProfileCard";
import RankCard from "../profile/RankCard";
import BadgeCard from "../profile/BadgeCard";
import QuickLinks from "../profile/QuickLinks";

export default function Sidebar({ children, dashboard }) {
  return (
    <aside className="sticky top-28 space-y-6">
      {children ? (
        children
      ) : (
        <>
          <ProfileCard dashboard={dashboard} />
          <RankCard dashboard={dashboard} />
          <BadgeCard dashboard={dashboard} />
          <QuickLinks />
        </>
      )}
    </aside>
  );
}