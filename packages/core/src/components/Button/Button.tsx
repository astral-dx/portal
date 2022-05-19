import { styled, Button as MuiButton, alpha, ButtonProps, Palette } from "@mui/material";
import Link from "next/link";

const getColor = (color: ButtonProps['color'], palette: Palette): string => {
  if (color === undefined || color === 'inherit') {
    return palette.info.main;
  }

  return palette[color].main;
}

export const StyledButton = styled(MuiButton)(({ theme, size, color }) => `
  padding: ${theme.spacing(size === 'small' ? 0.5 : 1, size === 'small' ? 1.5 : 3)};
  font-weight: 800;
  letter-spacing: .1rem;
  background: ${alpha(getColor(color, theme.palette), 0.15)};
  border-radius: 10px;

  &:hover {
    background: ${alpha(getColor(color, theme.palette), 0.225)};
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