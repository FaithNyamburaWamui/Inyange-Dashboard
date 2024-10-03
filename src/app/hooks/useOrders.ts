import { useState, useEffect } from 'react';
import { Order } from '../utils/types';
import { fetchOrder} from '../utils/fetchOrder';


export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    // Fetch orders when the hook mounts
    useEffect(() => {
      const getOrders = async () => {
        console.log('Fetching orders...');
        try {
          const data = await fetchOrder();
          console.log('Fetched data:', data);
          setOrders(data);
          setLoading(false);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setLoading(false);
        }
      };
      getOrders();
    }, []);
  
    // Function to fetch order details
    const fetchOrderDetails = async () => { 
      setLoading(true);
      try {
        const response = await fetch('/api/orderdetails', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
  
        const orderData = await response.json();
  
        // Update the state with the fetched order details
        setOrders(orderData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching order details');
        setLoading(false);
      }
    };
  
    // Return orders, loading, error, and fetchOrderDetails
    return { orders, isLoading, error, fetchOrderDetails };
  };
  
  

// export function useOrders() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   const fetchOrder = async () => {
//     setIsLoading(true);
//     try {
//       const data = await fetchOrderUtil();
//       setOrders(data);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An unknown error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   return { orders, isLoading, error, fetchOrder};
// }
  
  

