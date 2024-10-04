
import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/orderdetails`);
    
    if (!response.ok) {
      const errorText = await response.text(); 
      return NextResponse.json({ error: 'Failed to fetch order details: ' + errorText }, { status: response.status });
    }

    const orders = await response.json();
    
    return NextResponse.json(orders);
    
  } catch (error) {
    console.error('Error fetching orders:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch orders: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}

