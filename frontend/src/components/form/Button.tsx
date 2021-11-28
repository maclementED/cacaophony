import React from 'react';
import Spinner from '../spin/Spinner';

interface Props {
  isSubmitting?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button({ isSubmitting = false, className = 'btn-primary', children }: Props) {
  return (
    <button className={`btn ${className}`} disabled={isSubmitting} type="submit">
      {isSubmitting && <Spinner />}
      {children}
    </button>
  );
}
