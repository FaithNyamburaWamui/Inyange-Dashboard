import { Order } from './types';

const baseURL = process.env.BASE_URL;

// Fetch a single order by ID
export const fetchOrderById = async (orderId: number): Promise<Order> => {
  console.log(`Fetching order from API. Order ID: ${orderId}, BASE_URL: ${baseURL}`);
  if (!baseURL) {
    throw new Error('BASE_URL is not defined');
  }
  
  try {
    const response = await fetch(`${baseURL}/api/orderdetail/${orderId}/`);
    console.log('API response status:', response.status);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error response:', errorData);
      throw new Error(`Failed to fetch order: ${response.status} ${response.statusText}`);
    }
    const data: Order = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// Delete an order by ID
export const deleteOrderById = async (orderId: number): Promise<void> => {
    if (!baseURL) {
      throw new Error('BASE_URL is not defined');
    }
  
    try {
      const response = await fetch(`${baseURL}/api/orderdetail/${orderId}/`, {
        method: 'DELETE', // Set the HTTP method to DELETE
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(`Failed to delete order: ${response.status} ${response.statusText}`);
      }
  
      // You can return nothing or a success message if needed
      console.log(`Order with ID ${orderId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  };