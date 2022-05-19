import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser } from '../../state/auth/authSlice';

const RequireAuth = ({ children }) => {
    let user = useSelector(selectLoggedInUser);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RequireAuth;
