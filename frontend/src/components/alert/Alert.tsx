import React from 'react';

interface AlertProps {
  title?: string;
  summary?: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
  show?: boolean;
  close: () => void;
}

const variantStyling = {
  success: 'bi-check-circle-fill text-green-500',
  danger: 'bi-exclamation-triangle-fill text-red-600',
  warning: 'bi-exclamation-triangle-fill text-yellow-500',
  info: 'bi-info-circle-fill text-blue-500',
};

export default function Alert(props: AlertProps) {
  return (
    <div className={`fixed z-50 top-10 md:right-10`}>
      <div className="mx-auto px-6 max-w-screen-sm animate-bounce-once duration-200">
        <div className="bg-white rounded-lg border-gray-200 border p-3 shadow-lg">
          <div className="flex flex-row">
            <div className="px-2">
              <i className={`bi text-3xl ${variantStyling[props.variant]}`}></i>
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold">{props.title}</span>
              <span className="block text-gray-500">{props.summary}</span>
            </div>
            <div>
              <i className="bi bi-x-lg text-gray-500 cursor-pointer hover:text-black" onClick={props.close}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
