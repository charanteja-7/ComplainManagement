import API from './axios';

export type LostFoundStatus = 'Lost' | 'Found' | 'Returned';

export type ReportItemData = {
  itemName: string;
  description: string;
  location: string;
  status?: LostFoundStatus; // default is 'Lost' on backend
};

export type UpdateItemData = Partial<{
  itemName: string;
  description: string;
  location: string;
  status: LostFoundStatus;
  finder: string;
  matchedWith: string;
}>;


//student : Get all my reported items
export const getMyItems = () => API.get('/lost-found/my');

// Create lost/found item
export const reportItem = (data: ReportItemData) => API.post('/lost-found', data);

// Get all reported items
export const getAllItems = () => API.get('/lost-found');

// Get a single item by ID
export const getItemById = (id: string) => API.get(`/lost-found/${id}`);

// Admin: Update an item by ID
export const updateItem = (id: string, data: UpdateItemData) =>
  API.put(`/lost-found/${id}`, data);

// Admin: Delete an item by ID
export const deleteItem = (id: string) => API.delete(`/lost-found/${id}`);


