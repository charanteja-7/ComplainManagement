// components/NewLostItemModal.tsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { PackageSearch, XCircle } from 'lucide-react';

import { useLostFound } from '../context/LostFoundContext'; // Adjust the import path as necessary
type Props = {
  setShowNewLostItem: (v: boolean) => void;
};

const NewLostItemModal: React.FC<Props> = ({ setShowNewLostItem }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'Lost' | 'Found'>('Lost');
  const { createItem } = useLostFound();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createItem({ itemName, description, location, status });
      setShowNewLostItem(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-indigo-200 animate-fadeIn">
        <button onClick={() => setShowNewLostItem(false)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <XCircle className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-3 mb-6">
          <PackageSearch className="text-indigo-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-900">Report Lost/Found Item</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g., Blue Backpack"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Include color, brand, contents if any..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Where was it lost/found?"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Lost' | 'Found')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowNewLostItem(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewLostItemModal;