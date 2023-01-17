import React from 'react';
import {observer} from "mobx-react-lite";
import {metamaskStore} from "../stores/stores";
import {LoginButton} from "./LoginButton";
import {Box} from "grommet";

interface Props {
  children: React.ReactNode;
}

export const RouteAuthRequired: React.FC<Props> = observer(({children}) => {
  if(!metamaskStore.isAuthorized) {
    return <Box pad="xlarge" align="center" fill justify="center"><LoginButton /></Box>
  }

  return <>{children}</>;
});

RouteAuthRequired.displayName = 'RouteAuthRequired';
