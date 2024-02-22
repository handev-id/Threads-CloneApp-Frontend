import { Navigate } from 'react-router-dom';

const CheckSession = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />
    }
}

export default CheckSession;