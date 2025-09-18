// src/components/EmailForm.js
import React, { useState } from 'react';


const API_URL = process.env.API_URL || 'http://localhost:3000';

const EmailForm = () => {
  const [emailData, setEmailData] = useState({ to: '', subject: '', body: '' });
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.text();
      if (response.ok) {
        setMessage(`Success: ${data}`);
        setEmailData({ to: '', subject: '', body: '' });
      } else {
        setMessage(`Error: ${data}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-sm mb-6 bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Send Email</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">To:</label>
          <input
            type="email"
            id="to"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body:</label>
          <textarea
            id="body"
            name="body"
            value={emailData.body}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
        >
          {isSending ? 'Sending...' : 'Send Email'}
        </button>
      </form>
      {message && (
        <p className="mt-4 p-3 bg-gray-100 rounded-md text-sm text-gray-800">
          {message}
        </p>
      )}
    </div>
  );
};

export default EmailForm;
