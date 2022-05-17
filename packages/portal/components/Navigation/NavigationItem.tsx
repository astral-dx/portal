import React from "react";
import { Button, styled, Tooltip } from "@mui/material";
import CheckIcon from '@mui/icons-material/CheckCircle';
import InvisibleIcon from '@mui/icons-material/VisibilityOff';
import Link from "next/link";

import { useDemo } from "../../hooks/useDemo";

interface NavigationItemProps {
  title: string;
  href?: string;
}

const Wrapper = styled(Button)(({ theme }) => `
  text-transform: none;
  display: flex;
  justify-content: space-between;
`);

export const NavigationItem: React.FC<NavigationItemProps> = ({ title, href }) => {
  const { isDemo } = useDemo();
  
  if (href) {
    return (
      <Link href={href}>
        <Wrapper color="primary" fullWidth>
          {title}
          {isDemo && <CheckIcon color="success" fontSize="small" />}
        </Wrapper>
      </Link>
    )
  }

  if (isDemo) {
    return (
      <Tooltip title={'Won\'t display to users'} placement={'right'} arrow>
        <div>
          <Wrapper disabled color="primary" fullWidth>
            {title}
            <InvisibleIcon color="disabled" fontSize="small" />
          </Wrapper>
        </div>
      </Tooltip>
    );
  }

  return null;
}