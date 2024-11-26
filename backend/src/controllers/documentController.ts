import { Request, Response, NextFunction } from 'express';
import { Document, mockDocuments } from '../models/documentModel';

// 控制器函数：获取文档列表
export const getDocuments = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // 从查询参数中获取搜索关键字、分页和排序信息，设置默认值
    const { search = "", page = 1, limit = 10, sortBy = "title", sortOrder = "asc" } = req.query;

    // 初始化文档列表为全部文档
    let filteredDocuments: Document[] = mockDocuments;

    // 搜索功能：过滤文档，检查标题、描述或修改人是否包含搜索关键字
    if (search) {
      const searchStr = (search as string).toLowerCase(); // 将搜索关键字转换为小写
      filteredDocuments = mockDocuments.filter((doc: Document) =>
        doc.title.toLowerCase().includes(searchStr) || // 检查标题是否包含关键字
        doc.description.toLowerCase().includes(searchStr) || // 检查描述是否包含关键字
        doc.modifiedBy.toLowerCase().includes(searchStr) // 检查修改人是否包含关键字
      );
    }

    // 排序功能：根据指定字段和顺序对文档排序
    if (sortBy) {
      filteredDocuments = filteredDocuments.sort((a, b) => {
        const fieldA = (a[sortBy as keyof Document] || "").toString().toLowerCase(); // 获取文档的排序字段值
        const fieldB = (b[sortBy as keyof Document] || "").toString().toLowerCase(); // 获取另一个文档的排序字段值

        // 比较两个文档的排序字段值
        if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1; // 根据升序或降序返回比较结果
        if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
        return 0; // 如果相等，则保持原有顺序
      });
    }

    // 分页功能：计算起始索引和结束索引，并截取当前页的数据
    const start = Math.max(0, (Number(page) - 1) * Number(limit)); // 计算当前页起始索引
    const end = Math.min(filteredDocuments.length, start + Number(limit)); // 计算当前页结束索引
    const paginatedDocuments = filteredDocuments.slice(start, end); // 获取当前页的数据

    // 返回分页后的文档数据、当前页码、总页数和总结果数
    res.json({
      data: paginatedDocuments, // 当前页文档数据
      currentPage: Number(page), // 当前页码
      totalPages: Math.ceil(filteredDocuments.length / Number(limit)), // 总页数
      totalResults: filteredDocuments.length, // 总结果数
    });
  } catch (error) {
    // 捕获错误并打印日志
    console.error("Error fetching documents:", error);
    next(error); // 使用 next() 将错误传递给 Express 错误处理中间件
  }
};
