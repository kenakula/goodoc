import { Control } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { FiltersList } from './filters-list';
import { MobileFilter } from './mobile-filter';
import { StyledFiltersBlockTop } from './styled-components';
import { ClearFiltersButton } from './clear-filters-button';
import {
  ISpecialty,
  IGlobalService,
  IInsurance,
  ILanguage,
  FilterFormModel,
} from '@/shared/types';
import { useAppSelector } from '@/stores';
import { TABLET_WIDE_BREAKPOINT } from '@/shared/assets';

interface Props {
  specialties: ISpecialty[];
  services: IGlobalService[];
  insurances: IInsurance[];
  languages: ILanguage[];
  mobileFilterOpen: boolean;
  setMobileFilterOpen: Dispatch<SetStateAction<boolean>>;
  buildQueryString: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<FilterFormModel, any>;
  resetFilters: () => void;
}

export const FiltersBlock = ({
  setMobileFilterOpen,
  mobileFilterOpen,
  specialties,
  services,
  insurances,
  languages,
  buildQueryString,
  resetFilters,
  control,
}: Props): JSX.Element => {
  const [expandedBlocks, setExpandedBlocks] = useState<string[]>([]);
  const isTablet = useMediaQuery(TABLET_WIDE_BREAKPOINT);
  const { filtersCount } = useAppSelector(state => state.doctorsPage);

  const handleCloseMobileFilter = (): void => {
    setMobileFilterOpen(false);
  };

  const handleExpandGroup = (id: string): void => {
    setExpandedBlocks(prev => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }

      return prev.filter(item => item !== id);
    });
  };

  if (isTablet) {
    return (
      <Box className="filters-block">
        <StyledFiltersBlockTop>
          <Typography variant="h2">Фильтры</Typography>
          {filtersCount > 0 ? (
            <ClearFiltersButton resetFilters={resetFilters} />
          ) : null}
        </StyledFiltersBlockTop>
        <FiltersList
          specialties={specialties}
          services={services}
          insurances={insurances}
          languages={languages}
          handleChange={buildQueryString}
          formControl={control}
          expandedBlocks={expandedBlocks}
          handleExpandGroup={handleExpandGroup}
        />
      </Box>
    );
  }

  return (
    <MobileFilter
      open={mobileFilterOpen}
      setClosed={handleCloseMobileFilter}
      specialties={specialties}
      services={services}
      insurances={insurances}
      languages={languages}
      buildQueryString={buildQueryString}
      expandedBlocks={expandedBlocks}
      handleExpandGroup={handleExpandGroup}
      formControl={control}
      resetFilters={resetFilters}
    />
  );
};
