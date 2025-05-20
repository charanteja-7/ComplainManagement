// components/RegisterModal.tsx
import React, { useState } from 'react';
import { User, Mail, Lock} from 'lucide-react';
import { register } from '../api/auth';

type Props = {
  setShowRegister: (v: boolean) => void;
  setShowLogin: (v: boolean) => void;
};

const RegisterModal: React.FC<Props> = ({ setShowRegister, setShowLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await register(name, email, password, role);
      alert('Registration successful! Please login.');
      setShowRegister(false);
      setShowLogin(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <button onClick={() => setShowRegister(false)} className="text-gray-500 hover:text-gray-700">×</button>
          </div>
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Create a password"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'student' | 'admin')}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 mt-6">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
            >
              Create Account
            </button>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Already have an account? </span>
              <button
                type="button"
                onClick={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
