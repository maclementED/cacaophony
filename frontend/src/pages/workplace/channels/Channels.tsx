import React from 'react';
import { useAuth } from '../../../providers/AuthProvider';
import ChannelItem from './ChannelItem';

export default function Channels() {
  const { currentUser } = useAuth();
  return (
    <div className="p-6 flex flex-col gap-16 h-full">
      <div className="flex justify-between items-center cursor-pointer">
        <h1 className="text-3xl">Channels</h1>
        <i className="bi bi-chevron-down text-3xl"></i>
      </div>

      <div>
        <div className="text-gray-400 mb-4">
          <i className="bi bi-chevron-down mr-4"></i>
          CHANNELS
        </div>

        <ChannelItem id="1" name="General Chat" icon="☁" />
        <ChannelItem id="2" name="Management" icon="🔊" />
        <ChannelItem id="3" name="Design" icon="✏" />
      </div>

      <div>
        <div className="text-gray-400 mb-4">
          <i className="bi bi-chevron-down mr-4"></i>
          MESSAGES
        </div>
      </div>

      <div className="mt-auto flex items-center cursor-pointer">
        <img
          style={{ backgroundImage: 'url("' + currentUser?.photoURL + '")', backgroundSize: 'contain' }}
          className="w-10 h-10 rounded-full bg-gray-300"
        />
        <div className="text-lg ml-4">{currentUser?.displayName}</div>
      </div>
    </div>
  );
}
