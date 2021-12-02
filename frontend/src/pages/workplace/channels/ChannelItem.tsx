import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  name: string;
  icon?: string;
  id: string;
}

export default function ChannelItem({ name, icon = '#', id }: Props) {
  return (
    <NavLink
      to={id}
      activeClassName="bg-gray-700"
      className="w-full flex p-3 rounded-lg cursor-pointer hover:bg-gray-600 my-4"
    >
      <div className="mr-4 w-4">{icon}</div>
      <div>{name}</div>
    </NavLink>
  );
}
