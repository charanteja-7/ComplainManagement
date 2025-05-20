import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLostFound } from '../context/LostFoundContext';
import { Package, Pencil, Trash, Check, X } from 'lucide-react';

const statusOptions = ['Lost', 'Found', 'Returned'];

const MyLostFound: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const { myItems, removeItem, fetchMyItems, updateItemStatus } = useLostFound();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    itemName: '',
    description: '',
    location: '',
    status: 'Lost' as 'Lost' | 'Found' | 'Returned',
  });

  useEffect(() => {
    if (isLoggedIn) fetchMyItems();
  }, [isLoggedIn]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await removeItem(id);
    }
  };

  const handleEditClick = (item: any) => {
    setEditingId(item._id);
    setEditForm({
      itemName: item.itemName,
      description: item.description,
      location: item.location,
      status: item.status,
    });
  };

  const handleUpdate = async (id: string) => {
    console.log('editform', editForm);
    
    await updateItemStatus(id, editForm);
    setEditingId(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {myItems.map((item) => {
        const isEditing = editingId === item._id;
        return (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="w-full">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className="h-5 w-5 text-gray-500" />
                  {isEditing ? (
                    <input
                      className="border border-gray-300 rounded px-2 py-1 w-full"
                      value={editForm.itemName}
                      onChange={(e) => setEditForm({ ...editForm, itemName: e.target.value })}
                    />
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-900">{item.itemName}</h3>
                  )}
                </div>

                {isEditing ? (
                  <>
                    <textarea
                      className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                    <input
                      className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                      value={editForm.location}
                      onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                    />
                    <select
                      className="border border-gray-300 rounded px-2 py-1 mb-2"
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value as any })}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 mt-1">{item.description}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <span className="text-sm text-gray-500">Location: {item.location}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Reported By: {item.reporter?.name}
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col items-end space-y-2 ml-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === 'Lost'
                      ? 'bg-red-100 text-red-800'
                      : item.status === 'Found'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {item.status}
                </span>

                {user && user._id === item.reporter?._id && (
                  <div className="flex space-x-2 mt-2">
                    {isEditing ? (
                      <>
                        <Check className="h-5 w-5 text-green-600 cursor-pointer" onClick={() => handleUpdate(item._id)} />
                        <X className="h-5 w-5 text-gray-500 cursor-pointer" onClick={() => setEditingId(null)} />
                      </>
                    ) : (
                      <>
                        <Pencil className="h-4 w-4 text-blue-500 cursor-pointer" onClick={() => handleEditClick(item)} />
                        <Trash className="h-4 w-4 text-red-500 cursor-pointer" onClick={() => handleDelete(item._id)} />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyLostFound;
