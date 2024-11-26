import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void; // 触发搜索的回调函数
  onResetPage: () => void; // 重置分页的回调函数
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onResetPage }) => {
  const [inputValue, setInputValue] = useState<string>(""); // 输入框的实时值
  const [debouncedValue, setDebouncedValue] = useState<string>(""); // 防抖后的值

  // 防抖逻辑：每次输入变化后，设置一个延迟 1 秒的定时器更新 debouncedValue
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue); // 1 秒未变更时，更新 debouncedValue
    }, 1000);

    // 如果输入发生新变化，清除之前的定时器，重新计时
    return () => clearTimeout(timer);
  }, [inputValue]);

  // 每当防抖后的值变化时，调用 onSearch 和 onResetPage
  useEffect(() => {
    onResetPage(); // 仅当搜索条件变化时重置分页
    onSearch(debouncedValue.trim()); // 触发搜索回调
  }, [debouncedValue]);

  const handleSearch = () => {
    onResetPage(); // 点击搜索按钮时重置分页
    onSearch(inputValue.trim()); // 点击搜索按钮立即触发搜索
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search documents..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // 更新实时值
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
