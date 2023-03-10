import { SvgIcon, SvgIconProps } from '@mui/material';

export const IconArrowLeft = (props: SvgIconProps): JSX.Element => (
  <SvgIcon {...props}>
    <g clipPath="url(#clip0_142_4615)">
      <path
        d="M15.3333 4L7 12.3333"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12.3333L15.3333 20.6667"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_142_4615">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </SvgIcon>
);
