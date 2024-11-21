import { Request, Response, NextFunction } from 'express';
import { Document, mockDocuments } from '../models/documentModel';

export const getDocuments = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { search = "", page = 1, limit = 10, sortBy = "title", sortOrder = "asc" } = req.query;

    let filteredDocuments: Document[] = mockDocuments;

    // 搜索功能
    if (search) {
      const searchStr = (search as string).toLowerCase();
      filteredDocuments = mockDocuments.filter((doc: Document) =>
        doc.title.toLowerCase().includes(searchStr) ||
        doc.description.toLowerCase().includes(searchStr) ||
        doc.modifiedBy.toLowerCase().includes(searchStr)
      );
    }

    // 排序功能
    if (sortBy) {
      filteredDocuments = filteredDocuments.sort((a, b) => {
        const fieldA = (a[sortBy as keyof Document] || "").toString().toLowerCase();
        const fieldB = (b[sortBy as keyof Document] || "").toString().toLowerCase();

        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    // 分页功能
    const start = Math.max(0, (Number(page) - 1) * Number(limit));
    const end = Math.min(filteredDocuments.length, start + Number(limit));
    const paginatedDocuments = filteredDocuments.slice(start, end);

    res.json({
      data: paginatedDocuments,
      currentPage: Number(page),
      totalPages: Math.ceil(filteredDocuments.length / Number(limit)),
      totalResults: filteredDocuments.length,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    next(error); // 使用 next() 将错误传递给错误处理中间件
  }
};
