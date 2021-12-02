import React from 'react';
import { UserPublic } from '../../../models/User';
import MemberItem from '../MemberItem';
import LinkItem from './LinkItem';

export default function Details() {
  return (
    <div className="p-6 flex flex-col gap-16 h-full">
      <div>
        <h1 className="text-3xl pb-4">Members</h1>
        <MemberItem
          user={
            {
              photoUrl: 'https://avatars.githubusercontent.com/u/67877770?v=4',
              firstName: 'Max-Antoine',
              lastName: 'Clément',
            } as UserPublic
          }
        />
        <MemberItem
          user={
            {
              photoUrl: 'https://avatars.githubusercontent.com/u/67877802?v=4',
              firstName: 'Léo',
              lastName: 'Asselin-Sparks',
            } as UserPublic
          }
        />
      </div>

      <div>
        <h1 className="text-3xl pb-4">Images</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="aspect-w-1 aspect-h-1 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1548588627-f978862b85e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9udGFpbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              className="w-full rounded-lg"
            />
          </div>
          <div className="aspect-w-1 aspect-h-1 cursor-pointer">
            <img
              src="https://previews.123rf.com/images/s4sanchita/s4sanchita1211/s4sanchita121100063/16518244-vast-panaromic-view-of-montain-with-alpine-vegetation.jpg"
              className="w-full rounded-lg"
            />
          </div>
          <div className="aspect-w-1 aspect-h-1 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1548588627-f978862b85e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9udGFpbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              className="w-full rounded-lg"
            />
          </div>
          <div className="aspect-w-1 aspect-h-1 cursor-pointer">
            <img
              src="https://previews.123rf.com/images/s4sanchita/s4sanchita1211/s4sanchita121100063/16518244-vast-panaromic-view-of-montain-with-alpine-vegetation.jpg"
              className="w-full rounded-lg"
            />
          </div>
          <div className="aspect-w-1 aspect-h-1 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1548588627-f978862b85e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bW9udGFpbnxlbnwwfHwwfHw%3D&w=1000&q=80"
              className="w-full rounded-lg"
            />
          </div>
          <div className="aspect-w-1 aspect-h-1 cursor-pointer">
            <img
              src="https://previews.123rf.com/images/s4sanchita/s4sanchita1211/s4sanchita121100063/16518244-vast-panaromic-view-of-montain-with-alpine-vegetation.jpg"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl pb-4">
          Files & Link
          <span className="text-sm text-gray-400 ml-2">3 files and 2 links</span>
        </h1>
        <LinkItem date={new Date()} icon="FILE" name="Illustrator" size={40} link="https://google.ca"/>
      </div>
    </div>
  );
}
