"use client";

import { TodoItem } from "@/context/AppContext";
import TodoForm from "./TodoForm";

interface TodoListProps {
  todos: TodoItem[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  editingId: string | null;
  onCancelEdit: () => void;
  onSaveEdit: (id: string, text: string) => void;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  editingId,
  onCancelEdit,
  onSaveEdit,
}: TodoListProps) {
  return (
    <div className="space-y-2 mt-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
        >
          {editingId === todo.id ? (
            <TodoForm
              initialValue={todo.text}
              onSubmit={(text) => onSaveEdit(todo.id, text)}
              buttonText="บันทึก"
              onCancel={onCancelEdit}
            />
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => onToggle(todo.id)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`text-gray-800 dark:text-gray-200 ${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : ""
                  }`}
                >
                  {todo.text}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(todo.id)}
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
