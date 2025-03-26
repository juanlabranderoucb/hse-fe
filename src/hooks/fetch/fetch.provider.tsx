
import React from 'react';
import { FetchProviderProps } from './fetch.type';
import { FetchContext } from './fetch.context';

export const FetchProvider = ({ children, client }: FetchProviderProps) => {
  return (
    <FetchContext.Provider value={client}>
      {children}
    </FetchContext.Provider>
  );
};

FetchProvider.propTypes = {
  children: React.Component,
  client: () => {}
};
