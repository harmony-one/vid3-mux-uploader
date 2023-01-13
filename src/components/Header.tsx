import React from 'react';
import {Header as GrommetHeader, Nav} from "grommet"
import {AnchorLink} from "./AnchorLink";

interface Props {}

export const Header: React.FC<Props> = () => {
  return (
    <GrommetHeader background="light-3" pad="small">
      <Nav direction="row">
        <AnchorLink to="/upload" label="Upload" />
        <AnchorLink to="/videos" label="List of videos" />
      </Nav>
    </GrommetHeader>
  )
};

Header.displayName = 'Header';
