import axios from "axios";

export const register = async (payload: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/register`,
            {
                username: payload.username,
                password: payload.password,
            },
            { withCredentials: false }
        );
        console.log(response.data);
        return response.data
    } catch (error: any) {
        console.error(error.response.data.error);
    }
};

export const login = async (payload: any) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/login`,
            {
                username: payload.username,
                password: payload.password,
            },
            { withCredentials: false } 
        );
        return response;
    } catch (error: any) {
        console.error(error.response.data.error);
        return error.response.data;
    }
};

export const logout = async () => {
    try {
        const response = await
            fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
                method: 'POST',
            });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        /* 
            Clear any client-side authentication
            data (e.g., token stored in localStorage)
             */
            localStorage.removeItem('token');
            console.log("Logged out");
            // Redirect or update UI as needed after logout
 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };