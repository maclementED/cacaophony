import React from 'react';
import { Field as FormikField, ErrorMessage } from 'formik';
import MaskInput from 'react-maskinput/lib';
import { FieldProps, makeid } from './Field';

interface MaskedFieldProps extends FieldProps {
  mask: string;
  maskChar?: string;
}

export default function MaskedField({ name, className, placeHolder, label, ...props }: MaskedFieldProps) {
  const id = makeid();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <FormikField name={name}>
        {({ field }: { field: any }) => (
          <MaskInput
            {...field}
            id={id}
            data-testid={name}
            className={`form-control ${className}`}
            placeholder={placeHolder}
            maskChar="_"
            {...props}
          />
        )}
      </FormikField>

      <ErrorMessage className="text-red-600" component="div" data-testid={name + 'Error'} name={name} />
    </div>
  );
}
