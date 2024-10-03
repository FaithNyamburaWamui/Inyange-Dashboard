// src/app/api/orders/route.ts
// import type { NextApiRequest, NextApiResponse } from 'next';

// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     // Replace with your actual data source
//     const ordersData = [
//       { id: 1, month: 'January', total: 7000, brandBought: 'Shee' },
//       { id: 2, month: 'February', total: 3000, brandBought: 'Green timber' },
//       { id: 3, month: 'March', total: 5000, brandBought: 'Bamburi Cement' },
//       { id: 4, month: 'April', total: 6000, brandBought: 'Ria Cement' },
//       { id: 5, month: 'May', total: 7000, brandBought: 'Saj ceramics' },
//     ];
//     res.status(200).json(ordersData);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import { NextResponse } from 'next/server';

const baseURL = process.env.BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${baseURL}/api/orderdetails`);
    
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


//     const response = await fetch('https://buildmart-42eabdb55b17.herokuapp.com/api/orderdetails', {
//       headers: {
//         'Authorization': `Bearer ${process.env.BACKEND_API_KEY}`, // Replace with actual API key/environment variable
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.ok) {
//         console.error(`Backend API error: ${response.statusText}`);
//         return new Response(JSON.stringify({ message: `Backend API error: ${response.statusText}` }), { status: response.status });

      
//     }

//     const ordersData = await response.json();
//     return new Response(JSON.stringify(ordersData), { status: 200 });
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         return new Response(JSON.stringify({ message: 'Failed to fetch orders from the backend' }), { status: 500 });
//   }
// }