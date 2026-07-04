import { FC, ReactNode } from 'react';

export const Label: FC<{ name: string; children: ReactNode }> = ({ name, children }) => (
  <label className="mr-2 text-gray-500" htmlFor={name}>
    {children}
  </label>
);
