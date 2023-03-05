import { StyledSpecialtiesList } from './styled-components';
import { SpecialtyRef } from '@/shared/types';
import { capitalize } from '@/shared/assets';

interface Props {
  list: SpecialtyRef[];
}

export const DoctorSpecialties = ({ list }: Props): JSX.Element => {
  return (
    <StyledSpecialtiesList className="doctor-card-specialties">
      {list.map(({ specialties_id: { id, title } }) => (
        <li key={id}>{capitalize(title)}</li>
      ))}
    </StyledSpecialtiesList>
  );
};
