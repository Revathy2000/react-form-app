import React, { useState } from 'react';

const OTPForm = ({ onSubmit, email }) => {
  const [otp, setOTP] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp);
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <p>An OTP has been sent to {email}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OTPForm;