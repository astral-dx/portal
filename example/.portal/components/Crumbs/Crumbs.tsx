import { Breadcrumbs, IconButton, Link as MuiLink, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Card } from "../Layout/Card";
import { useRouter } from "next/router";

const StyledLink = styled(MuiLink)(({ theme }) => `
  font-weight: 800;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.1rem;
`);

const CrumbLink: React.FC<{ href: string }> = ({ href, children }) => (
  <Link href={href} shallow>
    <StyledLink underline="hover" color="primary" href={href}>
      { children }
    </StyledLink>
  </Link>
)

interface LinkDetail {
  label: string;
  path: string;
}

export const Crumbs = () => {
  const [linkDetails, setLinkDetails] = useState<LinkDetail[]>([])
  const router = useRouter();

  useEffect(() => {
    const parts = router.route.split('/').filter(part => !!part && part !== '[[...env]]');

    setLinkDetails(parts.map((part) => {
      const index = parts.indexOf(part);

      return {
        label: part.toUpperCase(),
        path: `/${[...parts].splice(0, index + 1).join('/')}`,
      };
    }));
    

  }, [router.route])
  
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 3, width: '100%' }}>
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon fontSize="small" />
      </IconButton>
      <Breadcrumbs
        sx={{ position: 'relative', top: '-1px' }}
        separator={<NavigateNextIcon sx={{ position: 'relative', top: '1px' }} fontSize="small" />}
      >
        { linkDetails.map(({ label, path }, i) => {
          if (linkDetails.length !== i + 1) {
            return (
              <CrumbLink key={path} href={path}>
                {label}
              </CrumbLink>
            )
          }
          return (
            <Typography fontSize={'0.8rem'} fontWeight={800} letterSpacing={'0.1rem'} key={path}>
              {label}
            </Typography>
          )
        }) }
      </Breadcrumbs>
    </Card>
  );
};