"use client";
import React, { useState } from "react";
import { useOrders } from "../hooks/useOrders";
import { Order } from "../utils/types";
import Link from "next/link";
import Layout from "../components/Layout";


export default function Orders() {
  const { orders, isLoading, error } = useOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 11;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen text-3xl ml-[550px]">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-3xl ml-[550px]">
        Error: {error}
      </div>
    );

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>

    
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-8 ml-[35px]">
        <h1 className="text-[32px] mt-[60px] font-bold mb-8 ml-[10px]">
          Orders
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-12 py-8  text-[20px] ">Item Number</th>
                <th className="border px-20 py-4 text-[20px]">Brand Name</th>
                <th className="border px-20 py-4 text-[20px]">Price</th>
                <th className="border px-20 py-4 text-[20px]">Order ID</th>
                <th className="border px-20 py-4 text-[20px]">Order Date</th>
                <th className="border px-10 py-4 text-[20px]">Status</th>
                <th className="border px-10 py-4 text-[20px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order: Order) =>
                Object.entries(order.cart_data).map(([itemNumber, item]) => (
                  <tr
                    key={`${order.order_id}-${itemNumber}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-14 py-4 text-[17px] font-medium">
                      {itemNumber}
                    </td>
                    <td className="border px-20 py-4 text-[17px] font-medium">
                      {item.brand_name}
                    </td>
                    <td className="border px-20 py-4 text-[17px] font-medium">
                      shs {item.price}
                    </td>
                    <td className="border px-20 py-4 text-[17px] font-medium">
                      {order.order_id}
                    </td>
                    <td className="border px-20 py-4 text-[17px] font-medium">
                      {new Date(order.order_date).toLocaleDateString()}
                    </td>
                    <td
                      className={`border px-4 py-2 text-[17px] font-semibold ${
                        order.status === "Delivered"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {order.status}
                    </td>

                    <td className="border px-4 py-2 text-[16px] font-medium">
                      <Link href="/orderid">
                        <button className="bg-[#F8B612] hover:bg-[#263C5A] text-white font-bold py-2 px-4 rounded">
                          View order
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 pb-8 ml-[70%] mb-[30px]">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-9 py-2 border rounded hover:bg-[#263C5A] ${
              currentPage === index + 1
                ? "bg-[#F8B612] text-white text-[18px] font-semibold"
                : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
    </Layout>

  );
}
