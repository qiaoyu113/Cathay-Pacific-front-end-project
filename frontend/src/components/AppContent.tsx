import React, { useState, useEffect } from "react";
import DocumentList from "./DocumentList";
import SearchBar from "./SearchBar";
import ToggleView from "./ToggleView";
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

const AppContent: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDocuments = async (page: number, query: string) => {
    setLoading(true);
    try {
      const response = await api.get("/documents", {
        params: { page, limit: 10, search: query },
      });
      setDocuments(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query); // 更新搜索关键字
  };

  const handleResetPage = () => {
    setCurrentPage(1); // 重置分页到第一页
  };

  return (
    <div className="app">
      {/* 搜索栏 */}
      <SearchBar onSearch={handleSearch} onResetPage={handleResetPage} />

      {/* 切换视图和总结果显示 */}
      <ToggleView
        isGridView={isGridView}
        onToggle={setIsGridView}
        totalResults={documents.length * totalPages}
      />

      {/* 加载状态或错误提示 */}
      {loading && <p>Loading documents...</p>}
      {!loading && (
        <DocumentList
          documents={documents}
          isGridView={isGridView}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default AppContent;
