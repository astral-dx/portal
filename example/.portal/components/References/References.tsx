import React from "react";
import ArticleIcon from '@mui/icons-material/Article';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import MapIcon from '@mui/icons-material/Map';
import SupportIcon from '@mui/icons-material/Support';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import { styled } from "@mui/material";

import { ReferenceLink } from "./ReferenceLink";

export type Reference = { url: string, type: string };

const Wrapper = styled('div')(({ theme }) => `
  margin: ${theme.spacing(0, -1.5)};
`);

export const References: React.FC<{ references: Reference[] }> = ({ references }) => {
  const find = (type: string) => references.find((r) => r.type === type);

  return (
    <Wrapper>
      <ReferenceLink
        Icon={ArticleIcon}
        title={'Documentation'}
        color={'primary'}
        href={ find('DOCS')?.url }
      />
      <ReferenceLink
        Icon={ChangeCircleIcon}
        title={'Change Log'}
        color={'primary'}
        href={ find('CHANGE_LOG')?.url }
      />
      <ReferenceLink
        Icon={MapIcon}
        title={'Roadmap'}
        color={'primary'}
        href={ find('ROADMAP')?.url }
      />
      <ReferenceLink
        Icon={SupportIcon}
        title={'Support'}
        color={'primary'}
        href={ find('SUPPORT')?.url }
      />
      <ReferenceLink
        Icon={MonitorHeartIcon}
        title={'System Status'}
        color={'primary'}
        href={ find('STATUS')?.url }
      />
    </Wrapper>
  );
}