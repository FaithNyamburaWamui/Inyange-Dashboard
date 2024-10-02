

import React from 'react';

type DashboardCardProps = {
  title: string;
  value: string | number;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value }) => {
  return (
    <div className="bg-[#263C5A] text-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center h-24 md:h-32 w-48 md:w-56 mx-auto ">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-xl font-medium">{value}</p>
    </div>
  );
};

export default DashboardCard;
