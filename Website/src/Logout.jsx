import React from 'react'
import axios from 'axios';

const Logout = () => {
    React.useEffect(() => {
        const checkAndRedirect = async () => {
            try {
                // Send user and type to the backend
                const response = await axios.get('/api/logout/', {
                    withCredentials: true,
                });

                // Redirect to /form page
                window.location.href = "/";
            } catch (error) {
                console.error('Error communicating with the backend');
            }
        };

        checkAndRedirect();
    }, []);
    return (
        <div>

        </div>
    )
}

export default Logout
