interface SearchHistoryProps {
  history: string[];
  onItemClick: (item: string) => void;
  onClear: () => void;
}

export default function SearchHistory({
  history,
  onItemClick,
  onClear,
}: SearchHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
          ประวัติการค้นหา
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
        >
          ล้างประวัติ
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onItemClick(item)}
            className="bg-white dark:bg-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
