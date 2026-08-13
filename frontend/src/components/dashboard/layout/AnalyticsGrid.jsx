export default function AnalyticsGrid({ children }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 items-stretch">
      {children}
    </div>
  );
}