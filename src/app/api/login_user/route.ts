

import { NextRequest, NextResponse } from 'next/server';


const baseUrl = process.env.BASE_URL


export async function POST(request: NextRequest) {
 const { email, password } = await request.json(); // Get email and password from the request


 // Validate that email and password are present
 if (!email || !password) {
   console.error('Validation failed: Missing email or password');
   return NextResponse.json(
     { success: false, message: 'Email and password are required.' },
     { status: 400 }
   );
 }


 try {
   // Forward the request to your backend's /api/login endpoint
   const response = await fetch(`${baseUrl}/api/login/`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ email, password }), // Send email and password to the backend
   });


   // If the backend responds with an error, return it to the client
   if (!response.ok) {
     const errorData = await response.json();
     console.error('Error from backend /api/login:', errorData);
     return NextResponse.json(errorData, { status: response.status });
   }


   // Parse and return the successful response from the backend
   const data = await response.json();
   return NextResponse.json(data, { status: response.status });
 } catch (error) {
   console.error('Error during login request:', error);
   return NextResponse.json(
     { error: 'An unexpected error occurred: ' + (error as Error).message },
     { status: 500 }
   );
 }
}
