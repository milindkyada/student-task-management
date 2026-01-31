import React from "react";
import "./Register.css";
const Register = () => {
  return (
    <div className="form-container">
      <h1 className="form-title">REGISTER</h1>
      <form>
        {/* Full Name Field */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name"
          />
        </div>
        {/* Email Address Field */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
          />
        </div>
        {/*phone Number Field */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
          />
        </div>
        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Create a password"
          />
        </div>
        {/*submit Button */}
        <button type="submit" className="btn-primary">
          Register
        </button>
        {/*link to login page*/}
      </form>
    </div>
  );
};

export default Register;
