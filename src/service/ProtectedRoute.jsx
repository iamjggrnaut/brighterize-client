import { Navigate } from 'react-router-dom'
import Loader from '../components/Loader';

const ProtectedRoute = ({ user, allowedRoles, loading, children }) => {

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
