// File: src/types.ts

export type Complaint = {
  id: string; // for frontend handling
  _id: string; // for backend handling
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Closed';
  category: 'Infrastructure' | 'Facilities' | 'Academic' | 'Other';
  createdAt: string;
  updatedAt: string;
  student: {
    _id: string;
    name: string;
    email: string;
  };
  adminResponse?: string;
};

export type LostItem = {
  _id: string;
  itemName: string;
  description: string;
  location: string;
  status: 'Lost' | 'Found' | 'Returned';
  reporter: {
    _id: string;
    name: string;
    email: string;
  };
  finder?: {
    _id: string;
    name: string;
    email: string;
  };
  matchedWith?: string;
  createdAt: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
};
