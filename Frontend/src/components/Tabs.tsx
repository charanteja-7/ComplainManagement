import React, { useState } from 'react';
import {
  FileText,
  Search,
  PlusCircle,
  LayoutDashboard,
  UserCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ComplaintFormModal from './ComplaintFormModal';
import { toast } from 'react-toastify';
import { useComplaints } from '../context/ComplaintsContext';

type Props = {
  activeTab: 'complaints' | 'lostfound' | 'dashboard' | 'mycomplaints' | 'mylostandfound';
  setActiveTab: (
    tab: 'complaints' | 'lostfound' | 'dashboard' | 'mycomplaints' | 'mylostandfound'
  ) => void;
  isLoggedIn: boolean;
  setShowNewLostItem: (v: boolean) => void;
};

const Tabs: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  isLoggedIn,
  setShowNewLostItem,
}) => {
  const { user } = useAuth();
  const { createNewComplaint } = useComplaints(); 
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';

  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const handleCreateComplaint = async (data: {
    title: string;
    category: string;
    description: string;
  }) => {
    try {
      setShowComplaintModal(false);
      await createNewComplaint(data);
      toast.success('Complaint submitted!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <>
      {/* Tab Buttons */}
      <div className="flex space-x-4 mb-8">
        {isAdmin && (
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'complaints'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('complaints')}
          >
            <FileText className="h-5 w-5" />
            <span>Complaints</span>
          </button>
        )}

        {isStudent && (
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'mycomplaints'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('mycomplaints')}
          >
            <UserCircle className="h-5 w-5" />
            <span>My Complaints</span>
          </button>
        )}
        {isStudent && (
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'mylostandfound'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('mylostandfound')}
          >
            <UserCircle className="h-5 w-5" />
            <span>My Lost & Found</span>
          </button>
        )}

        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            activeTab === 'lostfound'
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab('lostfound')}
        >
          <Search className="h-5 w-5" />
          <span>All Lost & Found</span>
        </button>

        {isAdmin && (
          <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'dashboard'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>
        )}
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between mb-6">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {isLoggedIn && activeTab === 'mycomplaints' && (
          <button
            onClick={() => setShowComplaintModal(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
          >
            <PlusCircle className="h-5 w-5" />
            <span>New Complaint</span>
          </button>
        )}

        {isLoggedIn && activeTab === 'mylostandfound' && (
          <button
            onClick={() => setShowNewLostItem(true)}
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Report Item</span>
          </button>
        )}
      </div>

      {/* Complaint Modal */}
      {showComplaintModal && (
        <ComplaintFormModal
          mode="create"
          setShowModal={setShowComplaintModal}
          onSubmit={handleCreateComplaint}
        />
      )}
    </>
  );
};

export default Tabs;
