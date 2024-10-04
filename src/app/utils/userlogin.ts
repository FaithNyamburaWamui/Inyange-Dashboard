
import { Credentials } from "./types";
const url = '/api/login_user';
const userlogin = async (userData: Credentials) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw new Error('Failed to post data');
    }
};
export default userlogin