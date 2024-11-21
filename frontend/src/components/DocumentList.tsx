import React from "react";
import DocumentCard from "./DocumentCard";
import "../styles/DocumentList.css";

interface Document {
  id: string;
  title: string;
  description: string;
  modifiedBy: string;
  modifiedDate: string;
  category: string;
  location: string;
}

interface DocumentListProps {
  documents: Document[]; // 当前页文档数据
  isGridView: boolean; // 列表视图还是网格视图
  currentPage: number; // 当前页
  totalPages: number; // 总页数
  onPageChange: (page: number) => void; // 页码改变时的回调函数
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  isGridView,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // 渲染分页控制器
  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(i)}
          disabled={i === currentPage} // 当前页禁用按钮
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div>
      <div className={`document-list ${isGridView ? "grid" : "list"}`}>
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            title={doc.title}
            description={doc.description}
            modifiedBy={doc.modifiedBy}
            modifiedDate={doc.modifiedDate}
            category={doc.category}
            location={doc.location}
            isGridView={isGridView}
          />
        ))}
      </div>

      {/* 分页控制器 */}
      <div className="pagination">
        {currentPage > 1 && (
          <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {renderPagination()}
        {currentPage < totalPages && (
          <button
            className="pagination-button"
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentList;
