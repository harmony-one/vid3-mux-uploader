import React, {ReactNode} from 'react';

import { Grommet } from 'grommet';
import {baseTheme} from "./themes/baseTheme";

interface Props {
  children: React.ReactNode | ReactNode[],
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <Grommet theme={baseTheme} full>
      {children}
    </Grommet>
  );
};

Providers.displayName = 'Providers';
