

import { useState } from "react";
import { Credentials } from "../utils/types";

export const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 

  const login = async (credentials: Credentials) => {
    setIsSubmitting(true);
    setErrorMessage(''); 
    setSuccessMessage(''); 

    try {
      const response = await fetch(
        "https://buildmart-42eabdb55b17.herokuapp.com/api/login/", 
        {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json(); 
        setErrorMessage(`Login failed: ${errorResponse.message || 'Unknown error'}`); 
        throw new Error(`Login failed: ${errorResponse.message || 'Unknown error'}`);
      }
      

      const data = await response.json();
      setSuccessMessage('Login successful!'); 
      return data; 
    } catch (error) {
      console.error("Failed to login:", error);
      setErrorMessage((error as Error).message || 'An error occurred during login.'); 
      throw error; 
    } finally {
      setIsSubmitting(false); 
    }
  };

  return { login, isSubmitting, errorMessage, successMessage }; 
};

