// src/App.js
import React from 'react';
import EmailForm from './components/EmailForm';
import SMSForm from './components/SMSForm';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">AWS Notification System</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EmailForm />
          <SMSForm />
        </div>
      </div>
    </div>
  );
}

export default App;