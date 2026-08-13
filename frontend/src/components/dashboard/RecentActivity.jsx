export default function RecentActivity({ dashboard }) {
  const recentList = dashboard?.recent?.recentAcSubmissionList || [];

  const activity = recentList.length > 0
    ? recentList.slice(0, 5).map((item) => {
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
    <div className="liquid-glass rounded-3xl p-8 shadow-2xl relative overflow-hidden h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-sky-100 pb-6 mb-6">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              Live Submission Feed
            </span>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
              Recent Submissions
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
            ✓ Live AC
          </span>
        </div>

        <div className="space-y-3">
          {activity.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 border border-sky-100 hover:border-sky-300 transition-colors shadow-2xs group"
            >
              <div>
                {item.titleSlug ? (
                  <a
                    href={`https://leetcode.com/problems/${item.titleSlug}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-slate-800 hover:text-sky-600 text-sm transition-colors"
                  >
                    {item.title} 🔗
                  </a>
                ) : (
                  <h3 className="font-bold text-slate-800 text-sm">{item.title}</h3>
                )}
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{item.time}</p>
              </div>

              <span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
                ✓ {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}