import { useEffect, useState } from "react";
import { executionService } from "../services/executionService";

export function useExecutions() {
  const [executions, setExecutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    executionService
      .list()
      .then(setExecutions)
      .finally(() => setLoading(false));
  }, []);

  return { executions, loading, setExecutions };
}
