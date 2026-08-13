export default function RecentActivity({ dashboard }) {
  const recentList = dashboard?.recent?.recentAcSubmissionList || [];

  const activity = recentList.length > 0
    ? recentList.slice(0, 8).map((item) => {
        const date = item.timestamp
          ? new Date(parseInt(item.timestamp) * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Recently";

        return {
          title: item.title,
          titleSlug: item.titleSlug,
          time: date,
          status: "Accepted",
        };
      })
    : [
        { title: "Two Sum", time: "Today", status: "Accepted" },
        { title: "Binary Tree Level Order Traversal", time: "Yesterday", status: "Accepted" },
        { title: "Longest Substring Without Repeating Characters", time: "2 days ago", status: "Accepted" },
        { title: "Merge Intervals", time: "3 days ago", status: "Accepted" },
      ];

  return (
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            Live Feed
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
            Recent Accepted Submissions
          </h2>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-100">
          ✓ Accepted
        </span>
      </div>

      <div className="space-y-4">
        {activity.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/80 border border-slate-100 hover:border-sky-200 transition-colors shadow-2xs group"
          >
            <div>
              {item.titleSlug ? (
                <a
                  href={`https://leetcode.com/problems/${item.titleSlug}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-slate-800 hover:text-sky-600 text-base transition-colors"
                >
                  {item.title} 🔗
                </a>
              ) : (
                <h3 className="font-bold text-slate-800 text-base">{item.title}</h3>
              )}
              <p className="text-xs font-medium text-slate-500 mt-1">{item.time}</p>
            </div>

            <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-2xs">
              ✓ {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}