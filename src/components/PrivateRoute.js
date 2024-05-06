    import React from 'react';
    import { useNavigate } from 'react-router-dom';

    function PrivateRoute() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const navigate = useNavigate();

    if (loggedInUser=='') {
        navigate('/login');
    }

    return null;
    }

    export default PrivateRoute;
