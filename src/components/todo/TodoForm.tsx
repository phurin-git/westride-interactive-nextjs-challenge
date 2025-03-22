"use client";

import { useState, FormEvent } from "react";

interface TodoFormProps {
  onSubmit: (text: string) => void;
  initialValue?: string;
  buttonText?: string;
  onCancel?: () => void;
}

export default function TodoForm({
  onSubmit,
  initialValue = "",
  buttonText = "เพิ่มรายการ",
  onCancel,
}: TodoFormProps) {
  const [text, setText] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (text.trim()) {
      onSubmit(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="เพิ่มรายการใหม่..."
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors"
        >
          {buttonText}
        </button>
      </div>

      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        >
          ยกเลิก
        </button>
      )}
    </form>
  );
}
