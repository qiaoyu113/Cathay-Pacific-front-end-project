import React, { useState } from "react";
import "../styles/SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void; // 触发搜索的回调函数
  onResetPage: () => void; // 重置分页的回调函数
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onResetPage }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearch = () => {
    onResetPage(); // 重置到第一页
    onSearch(inputValue.trim()); // 触发搜索回调
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search documents..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
