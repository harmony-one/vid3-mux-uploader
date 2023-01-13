import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Anchor, AnchorExtendedProps } from "grommet/components/Anchor";

export const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
  return <Anchor as={Link} {...props} />;
};

export type AnchorLinkProps = LinkProps & AnchorExtendedProps

AnchorLink.displayName = 'AnchorLink';
