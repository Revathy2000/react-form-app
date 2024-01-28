import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const InitialForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make POST request to backend endpoint
      const response = await axios.post('/api/store-message', {
        email,
        message,
      });

      // Handle response
      console.log('Message stored successfully:', response.data);
    } catch (error) {
      console.error('Error storing message:', error);
    }
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InitialForm;