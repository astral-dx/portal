import { alpha, Button as MuiButton, styled, SvgIcon, Tooltip, Typography, useMediaQuery, useTheme, darken } from "@mui/material";
import React, { useEffect, useState } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useDemo } from "../../hooks/useDemo";
import {PulseWrapper} from "../PulseWrapper/PulseWrapper";

interface ReferenceLinkProps {
  Icon?: typeof SvgIcon;
  title: string;
  description?: string;
  color: 'primary' | 'secondary';
  href?: string;
  comingSoon?: boolean;
}

const Wrapper = styled('div')<{ fullWidth: boolean }>(({theme, fullWidth}) => `
  display: inline-block;
  width: ${fullWidth ? '100%' : '50%'};
  padding: ${theme.spacing(1.5)};
  position: relative;
`);

const Button = styled(MuiButton)<{ target: string }>(({ theme, color }) => `
  text-transform: none;
  text-align: left;
  display: block;
  background-color: ${alpha('#fff', 0.5)};
  border: 1px solid ${theme.palette.grey[300]};
  padding: ${theme.spacing(3, 4)};
  border-radius: 10px;
  width: 100%;
  transition: all 200ms ease;

  &:hover {
    background-color: ${alpha('#fff', 0.75)};
  }
`);

const TitleWrapper = styled('div')(({theme}) => `
  display: flex;
  align-items: center;
  gap: ${theme.spacing(2)};
  padding: ${theme.spacing(1, 0)};
`);

const IconWrapper = styled('div')(({ theme }) => `
  display: flex;
  border-radius: 50%;
  padding: 10px;
`);

const Title = styled(Typography)(({theme}) => `
  font-weight: 800;
  font-size: 1.1rem;
  color: ${theme.palette.text.primary};
`);

const Description = styled(Typography)(({theme}) => `
  padding: ${theme.spacing(1, 0, 2)};
  color: ${theme.palette.text.secondary};
`);

const VisibilityWrapper = styled('div')(({theme}) => `
  position: absolute;
  z-index: 3;
  top: ${theme.spacing(2.5)};
  left: ${theme.spacing(2.5)};
`);

export const ReferenceLink: React.FC<ReferenceLinkProps> = ({ Icon, title, description, color, href, comingSoon }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('lg'));
  const { isDemo } = useDemo();
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setDisabled(!href);
  }, [isDemo, href])

  if (!isDemo && !href) {
    return null;
  }

  return (
    <Wrapper fullWidth={ isSmall }>
      { isDemo && (
        <VisibilityWrapper>
          { !href && (
            <Tooltip placement="left" title="This button won't appear to your customers">
              <VisibilityOffIcon fontSize="small" color="disabled" />
            </Tooltip>
          ) }
          { !!href && (
            <Tooltip placement="left" title="This button will appear to your customers">
              <PulseWrapper color={theme.palette.success.main} radius="50%" duration="1.3s" repeat={3}>
                <CheckCircleIcon fontSize="small" color="success" />
              </PulseWrapper>
            </Tooltip>
          ) }
        </VisibilityWrapper>
      ) }
      <Button href={ href } disabled={ disabled } target="_blank">
        <TitleWrapper>
          { Icon && (
            <IconWrapper sx={{ background: theme.palette[color].contrastText }}>
              <Icon fontSize={ 'large' } color={ disabled ? 'disabled' : color } />
            </IconWrapper>
          ) }
          <Title sx={{ opacity: disabled ? 0.4 : 1 }}>{ title }</Title>
          <div style={{ flex: 1 }} />
          <OpenInNewIcon fontSize={ 'medium' } color={ disabled ? 'disabled' : 'secondary' } />
        </TitleWrapper>
        { description && (
          <Description>
            { comingSoon && <span style={{ fontStyle: 'italic' }}>Coming soon!&nbsp;</span> }
            { description }
          </Description>
        ) }
      </Button>
    </Wrapper>
  )
}