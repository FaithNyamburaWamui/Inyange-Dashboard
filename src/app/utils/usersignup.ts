interface UserData {
    first_name: string,
    last_name:string,
    email: string,
    password: string,
    username:string,
    phone_number:string,
    user_role:string
  }
 
 
 
 
 
 
 const url = '/api/register_user/';
 export const userSignup = async (userData:UserData) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
       
        const responseData = await response.json();
       
        if (!response.ok) {
            // Handle specific error cases
            if (responseData.error) {
                throw new Error(responseData.error);
            } else {
                throw new Error('Failed to create user.');
            }
        }
        return responseData;
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
 };
 
 
  
 