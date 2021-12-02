import React from 'react';

export default function ChatHeader() {
  return (
    <div className="bg-gray-900 rounded-lg w-full flex justify-between p-4">
      <h1 className="text-lg">General Chat</h1>
      <div className="flex">
        <i className="bi bi-telephone-fill text-lg"></i>
      </div>
    </div>
  );
}
