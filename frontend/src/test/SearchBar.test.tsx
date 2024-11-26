import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  let onSearchMock: jest.Mock;
  let onResetPageMock: jest.Mock;

  beforeEach(() => {
    onSearchMock = jest.fn();
    onResetPageMock = jest.fn();
  });

  test("should call onSearch and onResetPage when clicking search button", () => {
    render(<SearchBar onSearch={onSearchMock} onResetPage={onResetPageMock} />);

    const input = screen.getByPlaceholderText("Search documents...");
    const button = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "simple test" } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith("simple test");
  });
});
