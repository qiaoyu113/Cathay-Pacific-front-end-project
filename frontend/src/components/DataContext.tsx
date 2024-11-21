import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import api from "../utils/api";

interface Document {
  id: string;
  title: string;
  description: string;
  modifiedBy: string;
  modifiedDate: string;
  category: string; // "PDF" or "Excel"
  location: string;
}

interface DataState {
  documents: Document[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  query: string;
}

interface DataContextType extends DataState {
  setQuery: (query: string) => void;
  toggleLoading: (loading: boolean) => void;
}

const initialState: DataState = {
  documents: [],
  totalResults: 0,
  loading: false,
  error: null,
  query: "",
};

const DataContext = createContext<DataContextType | undefined>(undefined);

type Action =
  | { type: "SET_DOCUMENTS"; payload: { documents: Document[]; total: number } }
  | { type: "SET_QUERY"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const dataReducer = (state: DataState, action: Action): DataState => {
  switch (action.type) {
    case "SET_DOCUMENTS":
      return {
        ...state,
        documents: action.payload.documents,
        totalResults: action.payload.total,
        loading: false,
      };
    case "SET_QUERY":
      return { ...state, query: action.payload, loading: true };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const fetchDocuments = async (query: string) => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await api.get("/documents", {
        params: { search: query, page: 1, limit: 10 },
      });

      const documents = response.data.data;
      const totalResults = response.data.totalResults;

      dispatch({
        type: "SET_DOCUMENTS",
        payload: {
          documents: response.data.data,
          total: totalResults,
        },
      });
    } catch (error: any) {
      dispatch({ type: "SET_ERROR", payload: error.message || "Failed to fetch documents" });
    }
  };

  useEffect(() => {
    fetchDocuments(state.query); // 监听 query 的变化
  }, [state.query]);

  const setQuery = (query: string) => {
    dispatch({ type: "SET_QUERY", payload: query });
  };

  const toggleLoading = (loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  };

  return (
    <DataContext.Provider value={{ ...state, setQuery, toggleLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): DataContextType => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
