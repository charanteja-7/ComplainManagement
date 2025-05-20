import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useComplaints } from '../context/ComplaintsContext';
import { Complaint } from './types';
import { toast } from 'react-toastify';
import ComplaintFormModal from './ComplaintFormModal';

const MyComplaints: React.FC = () => {
  const { user } = useAuth();
  const {
    complaints,
    fetchComplaints,
    handleUpdateComplaint,
    isLoading,
    error,
  } = useComplaints();

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    if (user) fetchComplaints();
  }, [user]);

  const handleUpdate = async (data: {
    title: string;
    category: string;
    description: string;
  }) => {
    if (!selectedComplaint) return;
    try {
      setShowEditModal(false);
      await handleUpdateComplaint(selectedComplaint._id, data as any);
      toast.success('Complaint updated');
      setSelectedComplaint(null);
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {isLoading && <p>Loading complaints...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {complaints.map((complaint) => (
        <div
          key={complaint._id}
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div className="w-full">
              <h3 className="text-lg font-semibold text-gray-900">
                {complaint.title}
              </h3>
              <p className="text-gray-600 mt-1">{complaint.description}</p>
              <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                <span>{complaint.category}</span>
                <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
              </div>
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
            <button
              onClick={() => {
                setSelectedComplaint(complaint);
                setShowEditModal(true);
              }}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Edit
            </button>
          </div>
        </div>
      ))}

      {showEditModal && selectedComplaint && (
        <ComplaintFormModal
          setShowModal={setShowEditModal}
          mode="edit"
          initialData={{
            title: selectedComplaint.title,
            description: selectedComplaint.description,
            category: selectedComplaint.category,
          }}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default MyComplaints;
