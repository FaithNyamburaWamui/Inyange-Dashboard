
import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/orderdetails/`);
    
    // Check for a successful response
    if (!response.ok) {
      const errorText = await response.text(); // Get the error response text
      return NextResponse.json({ error: 'Failed to fetch order details: ' + errorText }, { status: response.status });
    }

    // Parse the JSON from the response
    const orders = await response.json();
    
    // Return the orders as a JSON response
    return NextResponse.json(orders);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    
    // Ensure to return a response on error
    return NextResponse.json(
      { error: 'Failed to fetch orders: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}
