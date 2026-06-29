export default function ScoreCard({ title, score, type = 'default' }) {
  // Determine color based on score
  let colorClass = "text-green-400";
  let bgClass = "bg-green-400/10";
  let borderClass = "border-green-400/20";
  
  if (score < 50) {
    colorClass = "text-red-400";
    bgClass = "bg-red-400/10";
    borderClass = "border-red-400/20";
  } else if (score < 80) {
    colorClass = "text-yellow-400";
    bgClass = "bg-yellow-400/10";
    borderClass = "border-yellow-400/20";
  }

  // Highlight overall score
  if (type === 'overall') {
    return (
      <div className={`glass-panel p-6 flex flex-col justify-center items-center relative overflow-hidden border ${borderClass}`}>
        <div className={`absolute top-0 w-full h-1 ${bgClass.replace('/10', '/50')}`} />
        <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">{title}</h3>
        <div className={`text-6xl font-bold ${colorClass}`}>
          {score}
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-panel p-5 flex flex-col justify-between border ${borderClass}`}>
      <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
      <div className="flex items-end justify-between mt-4">
        <div className={`text-3xl font-bold ${colorClass}`}>
          {score}
        </div>
        <div className="text-xs text-gray-500">/ 100</div>
      </div>
    </div>
  );
}
