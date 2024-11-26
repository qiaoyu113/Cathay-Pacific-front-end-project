import React from "react";
import { render, waitFor } from "@testing-library/react";
import AppContent from "../components/AppContent";
import api from "../utils/api";

// 模拟 API 请求
jest.mock("../utils/api");

describe("AppContent Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should load and display documents", async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: {
        data: [
          { id: "1", title: "Document 1", description: "Description 1", category: "Category1" },
          { id: "2", title: "Document 2", description: "Description 2", category: "Category2" },
        ],
        totalPages: 1,
        currentPage: 1,
      },
    });

    const { getByText } = render(<AppContent />);

    (expect(getByText("Loading documents...")) as any).toBeInTheDocument();

    await waitFor(() => {
      (expect(getByText("Document 1")) as any).toBeInTheDocument();
      (expect(getByText("Document 2")) as any).toBeInTheDocument();
    });
  });
});
