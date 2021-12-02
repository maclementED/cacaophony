import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <div className="text-center flex flex-col items-center justify-center dark:bg-gray-800 h-screen">
        <small style={{ fontSize: '1em' }}>O O P S</small>

        <h2>Something went wrong...</h2>

        <h1 className="text-9xl p-3">404</h1>

        <p>The page you are looking for doesn't seem to exist or has been moved to a new location</p>

        <Link to="/login" className="text-teal-500 hover:underline hover:text-teal-600">Go back to the Login Page</Link>
      </div>
    </>
  );
}
