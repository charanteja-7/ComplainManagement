import React, { useState, useEffect } from 'react';
import { XCircle, FileText } from 'lucide-react';

type ComplaintFormModalProps = {
  setShowModal: (v: boolean) => void;
  onSubmit: (data: { title: string; description: string; category: string }) => void;
  initialData?: {
    title: string;
    description: string;
    category: string;
  };
  mode: 'create' | 'edit';
};

const ComplaintFormModal: React.FC<ComplaintFormModalProps> = ({
  setShowModal,
  onSubmit,
  initialData,
  mode,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Infrastructure');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setCategory(initialData.category);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, category });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl border border-indigo-200 animate-fadeIn">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <XCircle className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="text-indigo-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Complaint' : 'New Complaint'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter the issue title"
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
              placeholder="Describe the issue in detail"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option>Infrastructure</option>
              <option>Facilities</option>
              <option>Academic</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 shadow"
            >
              {mode === 'edit' ? 'Update Complaint' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplaintFormModal;
