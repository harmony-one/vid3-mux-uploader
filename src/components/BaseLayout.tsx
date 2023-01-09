import React from 'react';
import {Header} from "./Header";
import {Page, PageContent} from "grommet";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const BaseLayout: React.FC<Props> = ({children}) => {
  return <>
      <Header />
      <Page background="background-front" kind="narrow">
        <PageContent>
          {children}
        </PageContent>
      </Page>
    </>;
};

BaseLayout.displayName = 'BaseLayout';
