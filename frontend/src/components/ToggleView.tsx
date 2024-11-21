import React from "react";
import "../styles/ToggleView.css";

interface ToggleViewProps {
  isGridView: boolean;
  onToggle: (value: boolean) => void;
  totalResults: number;
}

const ToggleView: React.FC<ToggleViewProps> = ({
  isGridView,
  onToggle,
  totalResults,
}) => {
  return (
    <div className="toggle-view">
      {/* 切换按钮 */}
      <div className="toggle-buttons">
        <button
          className={`toggle-btn ${!isGridView ? "active" : ""}`}
          onClick={() => onToggle(false)}
          aria-label="List View"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill={isGridView ? "#ccc" : "#000"}
          >
            <circle cx="4" cy="6" r="2"></circle>
            <circle cx="4" cy="12" r="2"></circle>
            <circle cx="4" cy="18" r="2"></circle>
            <rect x="8" y="5" width="14" height="2"></rect>
            <rect x="8" y="11" width="14" height="2"></rect>
            <rect x="8" y="17" width="14" height="2"></rect>
          </svg>
        </button>

        <button
          className={`toggle-btn ${isGridView ? "active" : ""}`}
          onClick={() => onToggle(true)}
          aria-label="Grid View"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill={!isGridView ? "#ccc" : "#000"}
          >
            <rect x="3" y="3" width="8" height="8"></rect>
            <rect x="13" y="3" width="8" height="8"></rect>
            <rect x="3" y="13" width="8" height="8"></rect>
            <rect x="13" y="13" width="8" height="8"></rect>
          </svg>
        </button>
      </div>

      {/* 结果总数 */}
      <div className="total-results">
        About {totalResults} results
      </div>
    </div>
  );
};

export default ToggleView;
