import React, { FC } from 'react';

export const SettingsLabel: FC<{ name: string }> = ({ name, children }) => (
  <label className="mr-2 text-gray-400" htmlFor={name}>
    {children}
  </label>
);
