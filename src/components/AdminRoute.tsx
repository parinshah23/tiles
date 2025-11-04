    import { useAuth } from "../hooks/useAuth"; // Corrected path
    import { Navigate, Outlet } from "react-router-dom";

    // This component will wrap our admin pages
    const AdminRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        // Wait until we know the user's role
        return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl">Loading...</p>
        </div>
        );
    }

    // If loading is done and the user is an admin, show the page.
    // Otherwise, redirect them to the homepage.
    return user?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
    };

    export default AdminRoute;



