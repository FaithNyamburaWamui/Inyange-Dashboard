

import { useState } from "react";
import { Credentials } from "../utils/types";

export const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Initialize error message state
  const [successMessage, setSuccessMessage] = useState(''); // Initialize success message state

  const login = async (credentials: Credentials) => {
    setIsSubmitting(true);
    setErrorMessage(''); // Reset previous error message
    setSuccessMessage(''); // Reset previous success message

    try {
      const response = await fetch(
        "https://buildmart-42eabdb55b17.herokuapp.com/api/login/", // Adjust this URL based on your environment
        {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json(); // Parse as JSON
        setErrorMessage(`Login failed: ${errorResponse.message || 'Unknown error'}`); // Set a better error message
        throw new Error(`Login failed: ${errorResponse.message || 'Unknown error'}`);
      }
      

      const data = await response.json();
      setSuccessMessage('Login successful!'); // Set success message on successful login
      return data; // Return data on successful login
    } catch (error) {
      console.error("Failed to login:", error);
      setErrorMessage((error as Error).message || 'An error occurred during login.'); // Handle the error
      throw error; // Propagate the error to be handled by the caller
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return { login, isSubmitting, errorMessage, successMessage }; // Return the necessary properties
};

