import { styled, Typography } from '@mui/material';
import { getTypography } from '@/shared/assets';

const StyledFiltersCounter = styled(Typography)(({ theme }) => ({
  ...getTypography(theme, 14, 21),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(0, 0, 0, 1),
  width: 24,
  height: 24,
  borderRadius: 12,
  fontWeight: 600,
  color: theme.palette.background.default,
  backgroundColor: theme.palette.primary.main,
}));

interface Props {
  value: number;
}

export const FiltersCounter = ({ value }: Props): JSX.Element => {
  return (
    <StyledFiltersCounter variant="caption" className="filters-counter">
      {value}
    </StyledFiltersCounter>
  );
};
