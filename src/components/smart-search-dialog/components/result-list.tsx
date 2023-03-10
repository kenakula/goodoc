import { Typography, List, ListItemButton, Avatar, Box } from '@mui/material';
import Link from 'next/link';
import { closeSmartSearch, useAppDispatch, useAppSelector } from '@/stores';
import {
  getImageUrl,
  DOCTORS_PAGE,
  getHighlightedLetters,
} from '@/shared/assets';
import {
  ISmartSearchResult,
  ISpecialty,
  IClinic,
  IDoctor,
  IInsurance,
  IGlobalService,
  FilterFormModel,
  SmartSearchQuery,
  ILanguage,
} from '@/shared/types';
import { StyledResultList } from './styled-components';

// TODO рефактор

interface Props {
  result: ISmartSearchResult;
  search: string;
  handleChooseOptionCb?: (
    customQuery: SmartSearchQuery<FilterFormModel>,
  ) => void;
}

export const ResultList = ({
  result: { type, list },
  search,
  handleChooseOptionCb,
}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const { useCustomQuery } = useAppSelector(state => state.smartSearch);

  const closeSearchBox = (): void => {
    dispatch(closeSmartSearch({ clear: true }));
  };

  switch (type) {
    case 'specialties':
      return (
        <StyledResultList>
          <Typography variant="h3">Специализация врачей</Typography>
          <List>
            {list.map(item => {
              const { id, title } = item as ISpecialty;

              return (
                <ListItemButton
                  key={`spec-${id}`}
                  className="search-link"
                  component={Link}
                  href={`${DOCTORS_PAGE}?specialty=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'specialties',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  {getHighlightedLetters(title, search)}
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    case 'globalService':
      return (
        <StyledResultList>
          <Typography variant="h3">Услуги</Typography>
          <List>
            {list.map(item => {
              const { id, name } = item as IGlobalService;

              return (
                <ListItemButton
                  key={`service-${id}`}
                  className="search-link"
                  component={Link}
                  href={`${DOCTORS_PAGE}?service=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'services',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  {getHighlightedLetters(name, search)}
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    case 'clinics':
      return (
        <StyledResultList>
          <Typography variant="h3">Клиники</Typography>
          <List>
            {list.map(item => {
              const { id, name, image, address } = item as IClinic;

              return (
                <ListItemButton
                  key={`clinic-${id}`}
                  className="complex-item"
                  component={Link}
                  href={`${DOCTORS_PAGE}?clinic=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'clinics',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    variant="rounded"
                    src={getImageUrl(image.id, name, 'width=80&height=80')}
                  />
                  <Box className="complex-item-info">
                    <Typography>
                      {getHighlightedLetters(name, search)}
                    </Typography>
                    <Typography variant="caption">{address}</Typography>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    case 'docs':
      return (
        <StyledResultList>
          <Typography variant="h3">Врачи</Typography>
          <List>
            {list.map(item => {
              const { id, image, firstName, lastName, specialties } =
                item as IDoctor;

              return (
                <ListItemButton
                  key={`doctor-${id}`}
                  className="complex-item"
                  component={Link}
                  href={`${DOCTORS_PAGE}/${id}`}
                  onClick={closeSearchBox}
                >
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    variant="circular"
                    src={getImageUrl(image.id, firstName, 'width=80&height=80')}
                  />
                  <Box className="complex-item-info">
                    <Typography>
                      {getHighlightedLetters(
                        `${firstName} ${lastName ?? ''}`,
                        search,
                      )}
                    </Typography>
                    <Typography variant="caption">
                      {specialties
                        .map(spec => spec.specialties_id.title)
                        .join(', ')}
                    </Typography>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    case 'insurances':
      return (
        <StyledResultList>
          <Typography variant="h3">Страховые компании</Typography>
          <List>
            {list.map(item => {
              const { id, image, name } = item as IInsurance;

              return (
                <ListItemButton
                  key={`insurance-${id}`}
                  className="complex-item"
                  component={Link}
                  href={`${DOCTORS_PAGE}?insurance=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'insurances',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  <Avatar
                    sx={{ width: 40, height: 40 }}
                    variant="rounded"
                    src={getImageUrl(image.id, name, 'width=80&height=80')}
                  />
                  <Box className="complex-item-info">
                    <Typography>
                      {getHighlightedLetters(name, search)}
                    </Typography>
                  </Box>
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
    default:
      return (
        <StyledResultList>
          <Typography variant="h3">Языки врача</Typography>
          <List>
            {list.map(item => {
              const { id, name } = item as ILanguage;

              return (
                <ListItemButton
                  key={`lang-${id}`}
                  className="search-link"
                  component={Link}
                  href={`${DOCTORS_PAGE}?lang=${id}`}
                  onClick={e => {
                    if (useCustomQuery && handleChooseOptionCb) {
                      e.preventDefault();
                      handleChooseOptionCb({
                        name: 'languages',
                        value: id.toString(),
                      });
                      closeSearchBox();
                    } else {
                      closeSearchBox();
                    }
                  }}
                >
                  {getHighlightedLetters(name, search)}
                </ListItemButton>
              );
            })}
          </List>
        </StyledResultList>
      );
  }
};
