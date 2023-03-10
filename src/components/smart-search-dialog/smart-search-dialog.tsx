import { useEffect, useRef } from 'react';
import {
  Box,
  Fade,
  IconButton,
  Input,
  InputAdornment,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { IconClose, IconSearch } from '@/components/icons';
import {
  closeSmartSearch,
  searchFieldClear,
  searchFieldInput,
  smartSearch,
  useAppDispatch,
  useAppSelector,
} from '@/stores';
import { useDebounce } from '@/shared/hooks';
import { SmartSearchQuery, FilterFormModel } from '@/shared/types';
import { Breakpoints } from '@/shared/enums';
import { SearchResult, StyledDialog, StyledDialogHeader } from './components';
import { useCloseOnMainPageTablet, useFullscreenMode } from './hooks';

interface Props {
  handleSubmitCb: (name?: string) => void;
  placeholder: string;
  handleChooseOptionCb?: (
    customQuery: SmartSearchQuery<FilterFormModel>,
  ) => void;
  clearInputCb?: () => void;
}

export const SmartSearchDialog = ({
  handleSubmitCb,
  placeholder,
  handleChooseOptionCb,
  clearInputCb,
}: Props): JSX.Element => {
  const { opened, searchStr, searchStatus, errorMessage, result } =
    useAppSelector(state => state.smartSearch);
  const dispatch = useAppDispatch();
  const isTablet = useMediaQuery(Breakpoints.TabeltWide);
  const inputRef = useRef<HTMLInputElement>(null);
  useFullscreenMode(opened, isTablet, inputRef);
  useCloseOnMainPageTablet(isTablet);
  const debouncedValue = useDebounce(searchStr, 400);

  useEffect(() => {
    if (debouncedValue.length > 2) {
      dispatch(smartSearch(debouncedValue));
    }
  }, [debouncedValue, dispatch]);

  const onInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    dispatch(searchFieldInput(e.target.value));
  };

  const clearInput = (): void => {
    dispatch(searchFieldClear());

    if (clearInputCb) {
      clearInputCb();
    }
  };

  const handleClose = (): void => {
    dispatch(closeSmartSearch({ clear: false }));
  };

  const onSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(closeSmartSearch({ clear: false }));
    handleSubmitCb(searchStr);
  };

  return (
    <Fade in={opened}>
      <StyledDialog className="search-dialog">
        {!isTablet && (
          <>
            <StyledDialogHeader>
              <Typography variant="h2">??????????</Typography>
              <IconButton onClick={handleClose}>
                <IconClose id="smart-search-close" />
              </IconButton>
            </StyledDialogHeader>
            <Box className="input-container">
              <IconSearch />
              <form action="#" onSubmit={onSearchFormSubmit}>
                <Input
                  inputRef={inputRef}
                  placeholder={placeholder}
                  fullWidth
                  onChange={onInputChange}
                  value={searchStr}
                  endAdornment={
                    searchStr.length ? (
                      <InputAdornment position="end">
                        <IconButton aria-label="????????????????" onClick={clearInput}>
                          <IconClose id="smart-search-clear" />
                        </IconButton>
                      </InputAdornment>
                    ) : null
                  }
                />
              </form>
            </Box>
          </>
        )}
        <Box className="dialog-body">
          <SearchResult
            searchStatus={searchStatus}
            result={result}
            errorMessage={errorMessage}
            searchStr={searchStr}
            handleChooseOptionCb={handleChooseOptionCb}
          />
        </Box>
      </StyledDialog>
    </Fade>
  );
};
