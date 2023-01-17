import React, { useCallback } from "react";
import { Header as GrommetHeader, Nav, Avatar, Button } from "grommet";
import { Logout } from "grommet-icons";
import { AnchorLink } from "./AnchorLink";
import { metamaskStore } from "../stores/stores";

interface Props {}

export const Header: React.FC<Props> = () => {
  const handleLogout = useCallback(() => {
    metamaskStore.logout();
  }, []);

  return (
    <GrommetHeader background="light-3" pad="small">
      <Avatar background="brand">0x</Avatar>
      <Nav direction="row">
        <AnchorLink to="/upload" alignSelf="center" label="Upload" />
        <AnchorLink to="/videos" alignSelf="center" label="List of videos" />
        <Button hoverIndicator onClick={handleLogout} icon={<Logout />} />
      </Nav>
    </GrommetHeader>
  );
};

Header.displayName = "Header";
