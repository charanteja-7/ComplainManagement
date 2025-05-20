import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  HeartPulse,
  Headphones,
  Facebook,
  Twitter,
  Instagram
} from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-400">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-indigo-300 transition">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition">Contact Support</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-300 transition">FAQs</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-400">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-300" />
                <span>support@college.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-300" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-indigo-300" />
                <span>Student Services Building</span>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-indigo-400">Emergency Contacts</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-red-400" />
                <span>Security: (555) 911-0000</span>
              </li>
              <li className="flex items-center space-x-2">
                <HeartPulse className="w-4 h-4 text-red-400" />
                <span>Health Center: (555) 911-1111</span>
              </li>
              <li className="flex items-center space-x-2">
                <Headphones className="w-4 h-4 text-red-400" />
                <span>IT Help Desk: (555) 911-2222</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-sm">
          <p className="text-gray-400">&copy; 2024 College Student Support Portal. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-indigo-400 transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
