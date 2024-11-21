import React, { useEffect, useState } from "react";
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

interface DataProviderProps {
  children: (documents: Document[], loading: boolean, error: string | null) => React.ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/documents", {
          params: {
            page: 1,
            limit: 10,
          },
        });
        setDocuments(response.data.data); 
      } catch (err: any) {
        setError(err.message || "Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return <>{children(documents, loading, error)}</>;
};

export default DataProvider;
