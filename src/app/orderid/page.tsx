"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useOrderById } from '../hooks/useOrderById';

interface OrderDetailPageProps {
  params: { id: string };
}

const OrderDetailPage = ({ params }: OrderDetailPageProps) => {
  const [orderId, setOrderId] = useState<number | null>(null);

  // Parse orderId from params at the beginning
  useEffect(() => {
    const parsed = parseInt(params.id, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setOrderId(parsed);
    } else {
      setOrderId(null); // Set to null if invalid
    }
  }, [params.id]); // Depend only on params.id

  const { order, isLoading, error, cancelOrder } = useOrderById(orderId);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (order) {
      console.log('Fetched order:', order);
    }
  }, [order]);

  const handleCancel = async () => {
    if (!order || isCancelling) return;

    setIsCancelling(true);
    try {
      const success = await cancelOrder();
      if (success) {
        alert('Order cancelled successfully');
      } else {
        throw new Error('Failed to cancel order');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order');
    } finally {
      setIsCancelling(false);
    }
  };

  if (orderId === null) {
    return (
      <div className="p-4">
        <Link href="/order" className="mb-4 inline-block">&lt; Back</Link>
        <div className="text-red-500 font-bold">Invalid order ID</div>
      </div>
    );
  }

  if (isLoading) {
    return <div className='text-[15px] ml-[100px] mt-[100px]'>Loading...</div>;
  }

  if (error)  {
    return (
      <div className="p-4">
        <Link href="/order" className="mb-4 inline-block">&lt; Back</Link>
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-4">
        <Link href="/order" className="mb-4 inline-block">&lt; Back</Link>
        <div>No order found</div>
      </div>
    );
  }

  const orderItems = order.cart_data ? Object.values(order.cart_data) : [];

  return (
    <div className="p-4">
      <Link href="/order" className="mb-4 inline-block">&lt; Back</Link>
      <h1 className="text-2xl font-bold mb-2">Orders/{order.order_id}</h1>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">{order.customerName || "Customer's Orders"}</h2>
        <span className={`text-${order.status === 'Delivered' ? 'green' : 'red'}-500`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {orderItems.map((item, index) => (
          <div key={index} className="border p-2">
            <Image src={item.image || '/placeholder.png'} alt={item.material_name} width={100} height={100} />
            <p>{item.material_name}</p>
            <p>{item.quantity} kgs</p>
            <p>{item.category_name} - Location</p>
            <p>Mpesa - payment method</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button 
          onClick={handleCancel} 
          className={`bg-red-500 text-white px-4 py-2 rounded ${isCancelling ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isCancelling}
        >
          {isCancelling ? 'Cancelling...' : 'Cancel'}
        </button>
        <div>
          <span className="font-bold">Total</span>
          <span className="ml-2">shs {order.total_price}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <button className="mx-1 px-3 py-1 bg-yellow-500 rounded">1</button>
        <button className="mx-1 px-3 py-1 bg-gray-200 rounded">2</button>
        <button className="mx-1 px-3 py-1 bg-gray-200 rounded">3</button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
