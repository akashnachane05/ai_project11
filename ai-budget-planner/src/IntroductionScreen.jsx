import React from 'react';
import { Link } from 'react-router-dom';

export default function IntroductionScreen() {
  return (
    <div>
      <h1>Welcome to AI Budget Planner</h1>
      <div className="card">
        <h2>About Our Platform</h2>
        <p>
          AI Budget Planner is an innovative tool designed to help you manage your finances more effectively. 
          By leveraging artificial intelligence, we provide personalized budget recommendations and investment 
          suggestions tailored to your unique financial situation.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Intelligent budget allocation based on your income and expenses</li>
          <li>Visual representations of your financial breakdown</li>
          <li>Projected savings growth over time</li>
          <li>Customized investment suggestions to help grow your wealth</li>
        </ul>
        <Link to="/input">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
}