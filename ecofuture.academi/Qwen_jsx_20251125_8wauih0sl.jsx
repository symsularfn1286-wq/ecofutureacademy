export default function LevelBadge({ level }) {
  let color = 'bg-gray-400';
  let label = 'Pemula';

  if (level >= 50) {
    label = 'Master';
    color = 'bg-purple-600';
  } else if (level >= 20) {
    label = 'Pahlawan';
    color = 'bg-green-600';
  }

  return (
    <span className={`px-2 py-1 text-xs text-white rounded ${color}`}>
      {label}
    </span>
  );
}