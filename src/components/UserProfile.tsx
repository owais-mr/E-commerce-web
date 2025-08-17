import React from 'react';
import { useAuth } from '../context/AuthContext';

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="max-w-md mx-auto py-16 text-center text-xl text-slate-600">You are not logged in.</div>;
  }

  // Extract username from email (before @)
  const username = user.email ? user.email.split('@')[0] : 'User';

  return (
    <div className="max-w-lg mx-auto py-16 px-4">
      <div className="bg-gradient-to-r from-amber-400 to-yellow-300 rounded-2xl shadow-2xl p-8 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-6">
            <span className="text-5xl font-bold text-amber-500 uppercase">{username[0]}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{username}</h2>
          <div className="text-slate-500 mb-6">Welcome to your profile!</div>
          <div className="w-full bg-white rounded-lg shadow p-6 space-y-4">
            <div>
              <span className="block text-slate-500 font-medium mb-1">Email</span>
              <span className="block text-lg text-slate-800">{user.email}</span>
            </div>
            {/* Add more user info or actions here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
