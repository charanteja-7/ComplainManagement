import API from './axios';

// Create a new complaint (student)
export const createComplaint = (data: {
  title: string;
  category: string;
  description: string;
}) => API.post('/complaints', data);

// Get complaints for the logged-in student
export const getMyComplaints = () => API.get('/complaints/my');

// Get all complaints (admin only)
export const getAllComplaints = () => API.get('/complaints');

// Get complaint by ID (student who created or admin)
export const getComplaintById = (id: string) => API.get(`/complaints/${id}`);

// Update complaint (admin only)
export const updateComplaint = (
  id: string,
  data: { status?: string; adminResponse?: string }
) => API.put(`/complaints/${id}`, data);

// Update complaint (student who created it)
export const updateComplaintByStudent = (
  id: string,
  data: { title?: string; category?: string; description?: string }
) => API.put(`/complaints/${id}/student`, data);

// Delete complaint (admin only)
export const deleteComplaint = (id: string) => API.delete(`/complaints/${id}`);


