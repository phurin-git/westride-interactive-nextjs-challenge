"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface UserInfo {
  name: string;
  email: string;
  role: string;
}

interface AppState {
  todos: TodoItem[];
  user: UserInfo | null;
  searchHistory: string[];
  isDarkMode: boolean;
}

type AppAction =
  | { type: "ADD_TODO"; payload: TodoItem }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "SET_USER"; payload: UserInfo }
  | { type: "CLEAR_USER" }
  | { type: "ADD_SEARCH"; payload: string }
  | { type: "CLEAR_SEARCH_HISTORY" }
  | { type: "TOGGLE_DARK_MODE" };

const initialState: AppState = {
  todos: [],
  user: null,
  searchHistory: [],
  isDarkMode: false,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "CLEAR_USER":
      return {
        ...state,
        user: null,
      };
    case "ADD_SEARCH":
      if (state.searchHistory.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        searchHistory: [action.payload, ...state.searchHistory].slice(0, 10),
      };
    case "CLEAR_SEARCH_HISTORY":
      return {
        ...state,
        searchHistory: [],
      };
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        isDarkMode: !state.isDarkMode,
      };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
