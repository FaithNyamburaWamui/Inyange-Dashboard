"use client"

// import Image from "next/image";
import Layout from "./components/Layout";
import DashboardPage from "./dashboard/page";


export default function Home() {
  return (
    <Layout>
    <div>
      <DashboardPage/>
    </div>
    </Layout>
  );
}
