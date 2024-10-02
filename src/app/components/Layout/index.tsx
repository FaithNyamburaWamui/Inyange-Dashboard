"use client";
import React from 'react';
import Sidebar from '../Sidebar';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-[18%]  bg-[#263C5A] text-white">
        <Sidebar />
      </div>
      <div className="flex">
        {children}
      </div>
    </div>
  );
}

