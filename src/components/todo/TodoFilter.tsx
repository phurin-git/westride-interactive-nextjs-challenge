interface TodoFilterProps {
  filter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  todoCount: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function TodoFilter({
  filter,
  onFilterChange,
  todoCount,
}: TodoFilterProps) {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      <button
        onClick={() => onFilterChange("all")}
        className={`px-3 py-1 rounded-full text-sm ${
          filter === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        ทั้งหมด ({todoCount.all})
      </button>
      <button
        onClick={() => onFilterChange("active")}
        className={`px-3 py-1 rounded-full text-sm ${
          filter === "active"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        ยังไม่เสร็จ ({todoCount.active})
      </button>
      <button
        onClick={() => onFilterChange("completed")}
        className={`px-3 py-1 rounded-full text-sm ${
          filter === "completed"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        เสร็จแล้ว ({todoCount.completed})
      </button>
    </div>
  );
}
