import React, {ReactNode} from 'react';

import { Grommet } from 'grommet';

interface Props {
  children: React.ReactNode | ReactNode[],
}

export const Providers: React.FC<Props> = ({ children }) => {
  return <Grommet full>
    {children}
  </Grommet> ;
};

Providers.displayName = 'Providers';
