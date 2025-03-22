"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import TodoFilter from "@/components/todo/TodoFilter";

type FilterType = "all" | "active" | "completed";

export default function TodoPage() {
  const { state, dispatch } = useAppContext();
  const [filter, setFilter] = useState<FilterType>("all");
  const [editingId, setEditingId] = useState<string | null>(null);

  const addTodo = (text: string) => {
    const newTodo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    dispatch({ type: "ADD_TODO", payload: newTodo });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const filteredTodos = state.todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const startEditing = (id: string) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const updateTodo = (id: string, newText: string) => {
    const updatedTodos = state.todos.map((todo) =>
      todo.id === id ? { ...todo, text: newText } : todo,
    );

    dispatch({
      type: "ADD_TODO",
      payload: updatedTodos.find((todo) => todo.id === id)!,
    });

    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16 max-w-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">บันทึกรายการ</h1>

      <TodoForm onSubmit={addTodo} />

      <TodoFilter
        filter={filter}
        onFilterChange={setFilter}
        todoCount={{
          all: state.todos.length,
          active: state.todos.filter((t) => !t.completed).length,
          completed: state.todos.filter((t) => t.completed).length,
        }}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={startEditing}
        editingId={editingId}
        onCancelEdit={cancelEditing}
        onSaveEdit={updateTodo}
      />

      {filteredTodos.length === 0 && (
        <div className="text-center my-8 text-gray-500">
          {filter === "all"
            ? "ไม่มีรายการ"
            : filter === "active"
              ? "ไม่มีรายการที่ยังไม่เสร็จ"
              : "ไม่มีรายการที่เสร็จแล้ว"}
        </div>
      )}
    </div>
  );
}
