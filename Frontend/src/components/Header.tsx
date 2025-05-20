// components/Header.tsx
import React, { useState } from 'react';
import { LogIn, User, UserPlus, MessageSquare, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Props = {
  isLoggedIn: boolean;
  handleLogout: () => void;
  setShowLogin: (v: boolean) => void;
  setShowRegister: (v: boolean) => void;
};

const Header: React.FC<Props> = ({ isLoggedIn, handleLogout, setShowLogin, setShowRegister }) => {
  const { user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-indigo-600 text-white py-6 px-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Student Support Portal</h1>
        </div>

        {/* Auth/Profile Section */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-2 bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-400 transition"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
              >
                <UserPlus className="h-5 w-5" />
                <span>Register</span>
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-400 transition"
              >
                <User className="h-5 w-5" />
                <span>{user?.name || 'Profile'}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium">{user?.email}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
