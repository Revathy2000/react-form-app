import React, { useState } from 'react';
import InitialForm from './components/InitialForm';
import OTPForm from './components/OTPForm';
import WelcomePage from './components/WelcomePage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showInitialForm, setShowInitialForm] = useState(true);
  const [email, setEmail] = useState('');

  const handleInitialFormSubmit = (formData) => {

    setShowInitialForm(false);
    setEmail(formData.email);
  };

  const handleOTPFormSubmit = (otp) => {

    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <WelcomePage />
      ) : showInitialForm ? (
        <InitialForm onSubmit={handleInitialFormSubmit} />
      ) : (
        <OTPForm onSubmit={handleOTPFormSubmit} email={email} />
      )}
    </div>
  );
}

export default App;