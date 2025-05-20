// File: src/App.tsx
import { useState,useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Complaints from './components/Complaints';
import LostFound from './components/LostFound';
import MyLostFound from './components/MyLostFound';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import NewLostItemModal from './components/NewLostItemModal';
import Footer from './components/Footer';
import MyComplaints from './components/MyComplaints';
import AdminDashboard from './components/AdminDashboard';
import LandingPage from './components/LandingPage';
function App() {
  const [activeTab, setActiveTab] = useState<'complaints' | 'lostfound' | 'dashboard' | 'mycomplaints' | 'mylostandfound'>('complaints');
  const [showNewLostItem, setShowNewLostItem] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });
  const [loginType, setLoginType] = useState<'student' | 'admin'>('student');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
   
  useEffect(() => {
    if (user?.role === 'student') {
      setActiveTab('mycomplaints');
    } else if (user?.role === 'admin') {
      setActiveTab('complaints');
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('complaints');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />
  
      {!isLoggedIn ? (
        <LandingPage setShowLogin={setShowLogin}/>
      ) : (
        <main className="max-w-7xl mx-auto py-8 px-4">
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isLoggedIn={isLoggedIn}
            setShowNewLostItem={setShowNewLostItem}
          />
  
          {activeTab === 'complaints' && <Complaints />}
          {activeTab === 'lostfound' && <LostFound />}
          {activeTab === 'dashboard' && user?.role === 'admin' && <AdminDashboard />}
          {activeTab === 'mycomplaints' && <MyComplaints />}
          {activeTab === 'mylostandfound' && <MyLostFound />}
        </main>
      )}
  
      {showLogin && (
        <LoginModal
          setShowLogin={setShowLogin}
          setShowRegister={setShowRegister}
          loginType={loginType}
          setLoginType={setLoginType}
          setIsLoggedIn={setIsLoggedIn}
          setUser={setUser}
        />
      )}
  
      {showRegister && (
        <RegisterModal
          setShowRegister={setShowRegister}
          setShowLogin={setShowLogin}
        />
      )}
  
      {showNewLostItem && (
        <NewLostItemModal setShowNewLostItem={setShowNewLostItem} />
      )}
  
      <Footer />
    </div>
  );
}  

export default App;
