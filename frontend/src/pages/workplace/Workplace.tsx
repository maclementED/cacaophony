import React from 'react';
import Channels from './channels/Channels';
import Chat from './chat/Chat';
import Details from './details/Details';

export default function Workplace() {
  return (
    <div className="w-screen h-screen flex dark:bg-gray-800">
      <div className="w-[540px] dark:bg-gray-900 rounded-r-2xl">
        <Channels />
      </div>

      <div className="w-full">
        <Chat />
      </div>

      <div className="w-[700px] dark:bg-gray-900 rounded-l-2xl">
        <Details />
      </div>
    </div>
  );
}
