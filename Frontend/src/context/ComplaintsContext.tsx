import React, { createContext, useContext, useState, useEffect } from 'react';
import { createComplaint, getMyComplaints, updateComplaintByStudent,updateComplaint as updateComplaintAdmin, deleteComplaint as deleteComplaintApi,getAllComplaints } from '../api/complaints';
import { Complaint } from '../components/types';
import { useAuth } from './AuthContext';

type ComplaintsContextType = {
  complaints: Complaint[];
  isLoading: boolean;
  error: string | null;
  fetchComplaints: () => void;
  createNewComplaint: (complaintData: NewComplaintData) => Promise<void>;
  handleUpdateComplaint: (id: string, complaintData: Omit<Complaint, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  handleDeleteComplaint: (id: string) => Promise<void>;
};

type NewComplaintData = {
  title: string;
  category: string;
  description: string;
};

const ComplaintsContext = createContext<ComplaintsContextType>({
  complaints: [],
  isLoading: false,
  error: null,
  fetchComplaints: () => {},
  createNewComplaint: async () => {},
  handleUpdateComplaint: async () => {},
  handleDeleteComplaint: async () => {},
});

export const ComplaintsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';

  // Fetch complaints based on user role (admin or student)
  const fetchComplaints = async () => {
    setIsLoading(true);
    try {
      if (isAdmin) {
        const res = await getAllComplaints(); // Fetch all complaints for admin
        setComplaints(res.data);
      } else if (isStudent) {
        const res = await getMyComplaints(); // Fetch complaints created by the student
        setComplaints(res.data);
      }

      setError(null);
    } catch (err) {
      setError('Failed to fetch complaints');
    } finally {
      setIsLoading(false);
    }
  };

    // Create a new complaint (student only)
    const createNewComplaint = async (complaintData: NewComplaintData) => {
      setIsLoading(true);
      try {
        await createComplaint(complaintData); // Create the complaint
        fetchComplaints(); // Re-fetch after creating
      } catch (err) {
        setError('Failed to create complaint');
      } finally {
        setIsLoading(false);
      }
    };
  

   // Handle updating complaints (admin or student who created the complaint)
   const handleUpdateComplaint = async (id: string, complaintData: Omit<Complaint, '_id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    try {
      if (isAdmin) {
        await updateComplaintAdmin(id, complaintData); // Admin updates the complaint
      } else if (isStudent) {
        await updateComplaintByStudent(id, complaintData); // Student updates their own complaint
      }
      fetchComplaints(); // Re-fetch after updating
    } catch (err) {
      setError('Failed to update complaint');
    } finally {
      setIsLoading(false);
    }
  };
  

   // Handle deleting complaints (admin only)
   const handleDeleteComplaint = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteComplaintApi(id); // Delete the complaint
      fetchComplaints(); // Re-fetch after deleting
    } catch (err) {
      setError('Failed to delete complaint');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints(); // Fetch complaints when the component mounts
  }, []);

  return (
    <ComplaintsContext.Provider
      value={{
        complaints,
        isLoading,
        error,
        fetchComplaints,
        createNewComplaint,
        handleUpdateComplaint,
        handleDeleteComplaint,
      }}
    >
      {children}
    </ComplaintsContext.Provider>
  );
};

export const useComplaints = () => useContext(ComplaintsContext);