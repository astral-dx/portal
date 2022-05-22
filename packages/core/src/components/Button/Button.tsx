import { styled, Button as MuiButton, alpha, ButtonProps, Palette, PaletteColor } from "@mui/material";
import Link from "next/link";
import fontContrastColor from 'font-color-contrast';

const getColor = (color: ButtonProps['color'], palette: Palette): PaletteColor => {
  if (color === undefined || color === 'inherit') {
    return palette.info;
  }

  return palette[color];
}

export const StyledButton = styled(MuiButton)(({ theme, size, color }) => `
  padding: ${theme.spacing(size === 'small' ? 0.5 : 1, size === 'small' ? 1.5 : 3)};
  font-weight: 800;
  text-transform: none;
  background: ${alpha(getColor(color, theme.palette).main, 0.1)};
  border-radius: 10px;
  color: ${getColor(color, theme.palette).main};

  &:hover {
    background: ${alpha(getColor(color, theme.palette).main, 0.2)};
  }
`);

export const Button = (props: ButtonProps) => {
  if (props.href) {
    return (
      <Link shallow href={props.href}>
        <StyledButton {...props} />
      </Link>
    );
  }

  return (
    <StyledButton {...props} />
  );
}