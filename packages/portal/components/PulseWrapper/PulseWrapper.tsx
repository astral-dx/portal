import {alpha, styled} from "@mui/material";
import {MUIStyledCommonProps} from "@mui/system";

interface PulseWrapperProps {
  children: string | JSX.Element | JSX.Element[];
  color: string;
  pulseSize?: string;
  radius?: string;
  maxScale?: string | number;
  repeat?: string | number;
  display?: string;
  duration?: string;
}

const Wrapper = styled('span')(({
                                  theme,
                                  color,
                                  pulseSize,
                                  radius,
                                  maxScale,
                                  display,
                                  duration,
                                  repeat
                                }: MUIStyledCommonProps & PulseWrapperProps) => `
  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 ${alpha(color, 0.70)};
      
    }

    70% {
      transform: scale(${maxScale});
      box-shadow: 0 0 0 ${pulseSize} ${alpha(color, 0)};
    }

    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 ${alpha(color, 0)};
    }
  }

  animation: pulse ${duration} ${repeat};
  transform: scale(1);
  background: none;
  display: ${display};
  border-radius: ${radius};
`);

export const PulseWrapper = ({
                               children,
                               color,
                               pulseSize = '10px',
                               radius,
                               maxScale = 1.5,
                               display = 'flex',
                               duration = '2s',
                               repeat = 'infinite'
                             }: PulseWrapperProps) => {

  return (
    <Wrapper color={color} pulseSize={pulseSize} radius={radius} maxScale={maxScale} display={display}
             duration={duration} repeat={repeat}>
      {children}
    </Wrapper>
  );
};