import React from 'react';

interface Props {
  icon: 'LINK' | 'FILE';
  name: string;
  date: Date;
  size: number;
  link: string;
}

export default function LinkItem({ icon, name, date, size, link }: Props) {
  return (
    <a className="flex items-center" href={link}>
      <i className="bi bi-file-earmark-fill text-3xl mr-4"></i>
      <div>
        <h3 className="text-lg  hover:underline">{name}</h3>
        <div className="text text-gray-400">
          {new Date().toISOString().split("T")[0]} - {size}mb
        </div>
      </div>
    </a>
  );
}
