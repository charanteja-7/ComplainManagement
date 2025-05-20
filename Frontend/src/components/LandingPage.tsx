import { FileText, GraduationCap } from 'lucide-react';

type LandingPageProps = {
  setShowLogin: (value: boolean) => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ setShowLogin }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-teal-900 text-white flex justify-between items-center px-8 py-5 shadow-md">
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold tracking-wider">VJIT COLLEGE</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Hero Section */}
        <div className="md:w-1/2 bg-teal-800 text-white p-12 flex flex-col justify-center items-start space-y-6">
          <h1 className="text-5xl font-extrabold leading-snug">
            Complaint Management<br />& Lost & Found System
          </h1>
          <p className="text-lg text-teal-100 max-w-md">
            A centralized platform for students and staff to efficiently manage issues and recover lost belongings.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-teal-800 px-6 py-3 rounded-lg text-sm font-semibold shadow hover:bg-teal-50 transition"
          >
            Explore Now
          </button>
        </div>

        {/* Right Info Cards */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center space-y-8">
          {/* Complaints Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <FileText className="text-teal-700 w-10 h-10 mb-3" />
            <h2 className="text-xl font-bold mb-2 text-gray-800">Complaints</h2>
            <p className="text-gray-600 mb-4">
              Submit and monitor academic, hostel, or facility-related complaints — all in one place.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-teal-700 text-white px-5 py-2 rounded-md hover:bg-teal-800 transition"
            >
              Submit Complaint
            </button>
          </div>

          {/* Lost and Found Card */}
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <GraduationCap className="text-teal-700 w-10 h-10 mb-3" />
            <h2 className="text-xl font-bold mb-2 text-gray-800">Lost and Found</h2>
            <p className="text-gray-600 mb-4">
              Report or find lost belongings within the campus with a few simple clicks.
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-teal-700 text-white px-5 py-2 rounded-md hover:bg-teal-800 transition"
            >
              Report Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
