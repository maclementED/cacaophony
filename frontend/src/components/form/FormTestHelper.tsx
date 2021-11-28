import { fireEvent, render, waitFor } from "@testing-library/react";

/*
    Test if the field is valid 
*/
export function testValidField(name: string, field: string, value: string, component: JSX.Element) {
  return it(name, async () => {
    // Render the component
    const { getByTestId, queryByTestId } = render(component);

    // With fireEvent, change the target value. The value is the param and the target is found with the data-testid 
    //param. The wait for is a bug with formik, because states are being updating in the same time if not
    await waitFor(() => {
      fireEvent.change(getByTestId(field), { target: { value } });
    });
    // Unselect the field to check if its valid
    await waitFor(() => {
      fireEvent.blur(getByTestId(field));
    });

    await waitFor(() => {
      // Expect the errorMessage to not be present in the document
      expect(queryByTestId(field + "Error")).not.toBeInTheDocument();
    });
  });
}

/*
    Test if the field is invalid 
*/
export function testInvalidField(name: string, field: string, value: string, component: JSX.Element) {
  return it(name, async () => {
    const { getByTestId } = render(component);

    await waitFor(() => {
      fireEvent.change(getByTestId(field), { target: { value } });
    });

    await waitFor(() => {
      fireEvent.blur(getByTestId(field));
    });

    await waitFor(() => {
      expect(getByTestId(field + "Error")).not.toBe(null);
    });
  });
}

/*
    Test if the form is valid 
*/
export function testValidForm<T>(name: string, fields: { [index in keyof T]: string }, component: JSX.Element) {
  return it(name, async () => {
    const { getByTestId, queryByTestId } = render(component);

    for (const field in fields) {
      await waitFor(() => {
        fireEvent.change(getByTestId(field), { target: { value: fields[field as keyof T] } });
      });

      await waitFor(() => {
        fireEvent.blur(getByTestId(field));
      });

      // Expect the errorMessage to not be present in the document
      await waitFor(() => {
        expect(queryByTestId(field + "Error")).not.toBeInTheDocument();
      });
    }

    await waitFor(() => {
      fireEvent.click(getByTestId("submit"));
    });

    await waitFor(() => {
      expect(getByTestId("globalError")).toBeTruthy();
    });
  });
}
