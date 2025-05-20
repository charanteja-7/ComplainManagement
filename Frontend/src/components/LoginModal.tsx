// components/LoginModal.tsx
import React, { useState } from 'react';
import { Mail, Lock, School, Shield } from 'lucide-react';
import { login } from '../api/auth';

type Props = {
  setShowLogin: (v: boolean) => void;
  setShowRegister: (v: boolean) => void;
  loginType: 'student' | 'admin';
  setLoginType: (type: 'student' | 'admin') => void;
  setIsLoggedIn: (v: boolean) => void;
  setUser: (user: any) => void;
};

const LoginModal: React.FC<Props> = ({
  setShowLogin,
  setShowRegister,
  loginType,
  setLoginType,
  setIsLoggedIn,
  setUser
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data)); // Optional: for user context
      setShowLogin(false);
      setIsLoggedIn(true);
      setUser(res.data);
      window.location.reload(); // Or trigger auth context refresh
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <button onClick={() => setShowLogin(false)} className="text-gray-500 hover:text-gray-700">
              ×
            </button>
          </div>

          {/* Login Type Toggle */}
          <div className="flex space-x-4 mb-6">
            <button
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 ${
                loginType === 'student'
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setLoginType('student')}
            >
              <School className="h-5 w-5" />
              <span>Student</span>
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 ${
                loginType === 'admin'
                  ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setLoginType('admin')}
            >
              <Shield className="h-5 w-5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Remember me</label>
              </div>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
            >
              Sign in
            </button>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <button
                type="button"
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Register now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
