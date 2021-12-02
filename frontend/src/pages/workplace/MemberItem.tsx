import React from 'react';
import { User, UserPublic } from '../../models/User';

interface Props {
  user: UserPublic;
}

export default function MemberItem({ user }: Props) {
  return (
    <div className="flex items-center hover:underline cursor-pointer py-2">
      <div className="mr-4">
        <img
          style={{ backgroundImage: 'url("' + user.photoUrl + '")', backgroundSize: 'contain' }}
          className="h-10 w-10 rounded-full bg-gray-300"
        />
      </div>
      <div className="text-lg">{user.firstName + ' ' + user.lastName}</div>
    </div>
  );
}
