import React from "react";

const Homepage = () => {
  return (
    <div className="w3-container w3-center w3-display-middle">
      <h1>Welcome to the Homepage</h1>
      <p>This is the homepage of your application.</p>
      <a href="/login" className="w3-button w3-orange w3-round-xxlarge w3-card">
        Go to Login
      </a>
    </div>
  );
};

export default Homepage;
