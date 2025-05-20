import React, { createContext, useContext, useState } from 'react';
import {
  getAllItems,
  getMyItems,
  reportItem,
  updateItem,
  deleteItem,
  ReportItemData,
  UpdateItemData,
} from '../api/lostFound';
import { toast } from 'react-toastify';
import { LostItem } from '../components/types';


type LostFoundContextType = {
  items: LostItem[];
  myItems: LostItem[];
  loading: boolean;
  fetchItems: () => Promise<void>;
  fetchMyItems: () => Promise<void>;
  createItem: (data: ReportItemData) => Promise<void>;
  updateItemStatus: (id: string, data: UpdateItemData) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
};

const LostFoundContext = createContext<LostFoundContextType | undefined>(undefined);

export const LostFoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<LostItem[]>([]);
  const [myItems, setMyItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyItems = async () => {
    setLoading(true);
    try {
      const res = await getMyItems();
      setMyItems(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to fetch your items');
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await getAllItems();
      setItems(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };



  const createItem = async (data: ReportItemData) => {
    try {
      await reportItem(data);
      toast.success('Item reported successfully!');
      await fetchMyItems();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to report item');
    }
  };

  const updateItemStatus = async (id: string, data: UpdateItemData) => {
    try {
      await updateItem(id, data);
      toast.success('Item updated!');
      await fetchMyItems(); 
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };
  

  const removeItem = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success('Item deleted!');
      await fetchMyItems();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };



  return (
    <LostFoundContext.Provider
      value={{ items, myItems, loading, fetchItems, fetchMyItems, createItem, updateItemStatus, removeItem }}
    >
      {children}
    </LostFoundContext.Provider>
  );
};

export const useLostFound = () => {
  const context = useContext(LostFoundContext);
  if (!context) throw new Error('useLostFound must be used within LostFoundProvider');
  return context;
};
