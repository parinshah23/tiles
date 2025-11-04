import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"; // Use relative path

const AuthRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Wait for auth state to load
    return <div>Loading...</div>; // Or a full-page spinner
  }

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in, show the child page (e.g., WishlistPage)
  return <Outlet />;
};

export default AuthRoute;
