import React, { useEffect, useState } from 'react';
import { Complaint } from './types';
import { getAllComplaints, updateComplaint, deleteComplaint } from '../api/complaints';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

const COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#EF4444'];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');

  const fetchComplaints = async () => {
    try {
      const res = await getAllComplaints();
      setComplaints(res.data);
    } catch (err: any) {
      toast.error('Failed to fetch complaints');
    }
  };

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchComplaints();
    }
  }, [user]);

  const handleUpdate = async (id: string) => {
    try {
      await updateComplaint(id, { status, adminResponse: response });
      toast.success('Complaint updated');
      setEditing(null);
      fetchComplaints();
    } catch (err: any) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await deleteComplaint(id);
        toast.success('Complaint deleted');
        fetchComplaints();
      } catch (err: any) {
        toast.error('Deletion failed');
      }
    }
  };

  // 🔢 Aggregate Data for Charts
  const categoryData = Object.values(
    complaints.reduce((acc, curr) => {
      acc[curr.category] = acc[curr.category] || { name: curr.category, value: 0 };
      acc[curr.category].value += 1;
      return acc;
    }, {} as Record<string, { name: string; value: number }>)
  );

  const statusData = Object.values(
    complaints.reduce((acc, curr) => {
      acc[curr.status] = acc[curr.status] || { status: curr.status, count: 0 };
      acc[curr.status].count += 1;
      return acc;
    }, {} as Record<string, { status: string; count: number }>)
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Complaint Dashboard</h2>

      {/* 📊 Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Pie Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Complaints by Category</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </div>

        {/* Status Bar Chart */}
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Complaints by Status</h3>
          <BarChart width={400} height={250} data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="count" fill="#6366F1" />
          </BarChart>
        </div>
      </div>

      {/* 📝 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Admin Response</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-3">{c.title}</td>
                <td className="p-3">{c.category}</td>
                <td className="p-3">
                  {editing === c._id ? (
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                  ) : (
                    <span>{c.status}</span>
                  )}
                </td>
                <td className="p-3">{c.student.name}</td>
                <td className="p-3">
                  {editing === c._id ? (
                    <input
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    <span>{c.adminResponse || '-'}</span>
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {editing === c._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(c._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="bg-gray-300 text-black px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditing(c._id);
                          setStatus(c.status);
                          setResponse(c.adminResponse || '');
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
