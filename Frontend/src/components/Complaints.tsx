import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintsContext';
import { toast } from 'react-toastify';

const Complaints: React.FC = () => {
  const { user } = useAuth();
  const {
    complaints,
    fetchComplaints,
    handleUpdateComplaint,
    handleDeleteComplaint,
    isLoading,
    error,
  } = useComplaints();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchComplaints();
    }
  }, [user]);

  if (user?.role !== 'admin') {
    return <p className="text-red-500 font-semibold">Admin access required to view complaints.</p>;
  }

  const handleUpdate = async (id: string) => {
    try {
      await handleUpdateComplaint(id, { status, adminResponse: response } as any);
      toast.success('Complaint updated');
      setEditingId(null);
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        await handleDeleteComplaint(id);
        toast.success('Complaint deleted');
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {isLoading && <p>Loading complaints...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {complaints.map((complaint) => {
        const isEditing = editingId === complaint._id;

        return (
          <div
            key={complaint._id}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div className="w-full">
                <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                <p className="text-gray-600 mt-1">{complaint.description}</p>
                <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                  <span>{complaint.category}</span>
                  <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                  <span>{complaint.student?.name}</span>
                </div>

                {isEditing ? (
                  <div className="mt-4 space-y-2">
                    <select
                      className="border px-2 py-1 rounded w-full"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Closed</option>
                    </select>
                    <input
                      type="text"
                      className="border px-2 py-1 rounded w-full"
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Admin Response"
                    />
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Admin Response:</span>{' '}
                    {complaint.adminResponse || '-'}
                  </p>
                )}
              </div>

              <span
                className={`ml-4 px-3 py-1 rounded-full text-sm ${
                  complaint.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : complaint.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {complaint.status}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={() => handleUpdate(complaint._id)}
                    className="bg-green-500 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-300 text-black px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(complaint._id);
                      setStatus(complaint.status);
                      setResponse(complaint.adminResponse || '');
                    }}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(complaint._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Complaints;
