import { useRequireAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const token = useRequireAuth();
  if (!token) return null;
  return children;
}
