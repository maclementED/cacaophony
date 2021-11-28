import React from 'react';
import { Link } from 'react-router-dom';

export default function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <img src="/images/logo.svg" className="text-black w-1/4 h-1/4 animate-bounce" alt=""/>
      <h3 className="font-semibold text-3xl text-gray-500">Not Loading?</h3>
      <Link to="/login" className="text-teal-500 hover:underline text-lg">
        Return to login
      </Link>
    </div>
  );
}
