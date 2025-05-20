import React, { useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLostFound } from '../context/LostFoundContext';
import { Package } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LostFound: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const { items, fetchItems } = useLostFound();

  useEffect(() => {
    if (isLoggedIn) fetchItems();
  }, [isLoggedIn]);

  console.log(items);
  

  // Count items by status
  const statusData = useMemo(() => {
    const counts = { Lost: 0, Found: 0, Returned: 0 };
    items.forEach((item) => {
      if (item.status in counts) {
        counts[item.status]++;
      }
    });
    return [
      { name: 'Lost', value: counts.Lost },
      { name: 'Found', value: counts.Found },
      { name: 'Returned', value: counts.Returned },
    ];
  }, [items]);
  

  const COLORS = ['#f87171', '#facc15', '#4ade80'];
 
  
console.log(statusData);

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Item Status Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
             {statusData.map((_, index) => (
  <Cell key={`cell-${index}`} fill={COLORS[index]} />
))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Item List */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <Package className="h-5 w-5 text-gray-500" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.itemName}
                  </h3>
                </div>
                <p className="text-gray-600 mt-1">{item.description}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <span className="text-sm text-gray-500">
                    Location: {item.location}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Reported By: {item.reporter?.name}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === 'Lost'
                      ? 'bg-red-100 text-red-800'
                      : item.status === 'Found'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostFound;
