import { ErrorMessage, Field as FormikField } from 'formik';
import React from 'react';

export interface FieldProps {
  name: string;
  type?: string;
  className?: string;
  placeHolder?: string;
  label?: string;
  [key: string]: any;
}

export default function Field({ name, type = 'text', className, placeHolder, label, ...props }: FieldProps) {
  const id = makeid();
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <FormikField
        id={id}
        data-testid={name}
        name={name}
        type={type}
        className={`form-control dark:bg-gray-700 dark:border-gray-600 ${className}`}
        placeholder={placeHolder}
        {...props}
      />
      <ErrorMessage className="text-red-600" component="div" data-testid={name + 'Error'} name={name} />
    </div>
  );
}

//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export function makeid() {
  var result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
