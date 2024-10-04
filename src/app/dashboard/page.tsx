
"use client";

import React from 'react';
import Layout from '../components/Layout';
import BarChartComponent from '../components/Barchart/barchart';
import DashboardCard from '../components/DashboardCard/DashboardCard';
import { useGetOrders } from '../hooks/useGetOrders';

const DashboardPage: React.FC = () => {
  const { orders, loading, error } = useGetOrders();

//Sums up the total revenue
  const totalRevenue = orders 
    ? orders.reduce((sum, order) => {
        const cartItems = Object.values(order.cart_data);
        //calculates the total cost for each item.
        return sum + cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
      }, 0)
    : 0;

  // Counting the total number of unique brands bought

  //extracts all brands from all orders
  const brandsBoughtSet = new Set(orders.flatMap(order => 
    Object.values(order.cart_data).map(item => item.brand_name)
  ));

  //calculating the total number of unique brands by getting the size
  const brandsBought = brandsBoughtSet.size; 

  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  //  creates an array revenueData with objects for each month
  const revenueData = monthNames.map(month => ({
    month,
    revenue: 0 
  }));


  const brandsData: { brand: string; count: number }[] = [];
  const brandMap: { [key: string]: number } = {}; 

  // Calculates the revenue data and brands data based on orders
  orders.forEach(order => {
    const orderDate = new Date(order.order_date);
    const monthIndex = orderDate.getMonth(); 
    
    // Update the corresponding revenue for the month
    const cartItems = Object.values(order.cart_data);
    const orderTotal = cartItems.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
    
    if (monthIndex >= 0 && monthIndex < 12) {
      //This line increments the revenue for the month
      revenueData[monthIndex].revenue += orderTotal;
    }

    // Count brands in the cart
    cartItems.forEach(item => {
      const brand = item.brand_name; 
      if (brand) {
        // This line increments count for the brand
        brandMap[brand] = (brandMap[brand] || 0) + 1; 
      }
    });
  });

  // Convert brandMap to array
  for (const brand in brandMap) {
    brandsData.push({ brand, count: brandMap[brand] });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error}</div>;

  return (
    <div>
      <div className="flex justify-center" >
      <h1 className="text-center text-l md:text-2xl font-bold mt-8 mb-4">Dashboard</h1>
      </div>

      <div className="flex justify-center items-center flex-col mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-80 mb-8">
          <DashboardCard title="Total Revenue" value={`KES ${totalRevenue.toLocaleString()}`} />
          <DashboardCard title="Brands Bought" value={brandsBought.toLocaleString()} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3 w-full max-w-5xl">
          <BarChartComponent
            data={revenueData}
            xAxisKey="month" 
            barDataKey="revenue"
            title="Total Revenue per Month"
            yAxisLabel="Total revenue per month"
            barColor="#577399" 
            
          />
          <BarChartComponent
            data={brandsData}
            xAxisKey="brand" 
            barDataKey="count" 
            title="Number of Frequently Bought Brands"
            yAxisLabel='Number of brands bought'
            barColor="#577399" 
          />
        </div>
      </div>
      </div>
  );
};

export default DashboardPage;