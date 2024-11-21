// src/hooks/useDocuments.ts
import { useEffect, useState } from "react";
import api from "../utils/api";

interface Document {
  id: string;
  title: string;
  description: string;
  modifiedBy: string;
  modifiedDate: string;
  category: string;
  location: string;
}

interface FetchResult {
  data: Document[];
  currentPage: number;
  totalPages: number;
}

const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchDocuments = async (page = 1, search = "") => {
    setLoading(true);
    try {
      const response = await api.get<FetchResult>("/documents", {
        params: { page, search, limit: 10 },
      });
      setDocuments(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  return {
    documents,
    currentPage,
    totalPages,
    loading,
    setSearchQuery,
    setCurrentPage,
  };
};

export default useDocuments;
