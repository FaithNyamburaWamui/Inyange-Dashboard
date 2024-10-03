import { useState, useEffect, useCallback } from 'react';
import { Order } from '../utils/types';
import { deleteOrderById, fetchOrderById } from '../utils/fetchOrderById';

export function useOrderById(orderId: number) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = useCallback(async () => {
    console.log(`Fetching order with ID: ${orderId}`);
    if (isNaN(orderId) || orderId <= 0) {
      setError('Invalid order ID');
      setIsLoading(false);
      return;
    }    
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchOrderById(orderId);
      setOrder(data);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const cancelOrder = useCallback(async () => {
    if (!order) return false;
    try {
        await deleteOrderById(order.order_id); // Use deleteOrderById here
        setOrder(null);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel order');
      return false;
    }
  }, [order]);

  return { order, isLoading, error, fetchOrder, cancelOrder };
}

