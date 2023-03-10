import { Avatar, Box, Typography } from '@mui/material';
import { capitalize, capitilizeName, getImageUrl } from '@/shared/assets';
import { IDoctor, SpecialtyRef } from '@/shared/types';

interface Props {
  doctor: IDoctor;
  specialty: SpecialtyRef[];
}

export const DoctorHeader = ({
  doctor: { firstName, lastName, image },
  specialty,
}: Props): JSX.Element => {
  const getSpecialtiesName = (): string =>
    specialty.map(item => capitalize(item.specialties_id.title)).join(', ');

  return (
    <Box component="header" className="card-header">
      <Avatar
        src={getImageUrl(image, 'аватарка доктора')}
        alt="фотография врача"
      />
      <Box className="card-info">
        <Typography variant="h3" className="card-title">
          {capitilizeName(firstName, lastName)}
        </Typography>
        <Typography variant="body1" className="card-subtitle">
          {getSpecialtiesName()}
        </Typography>
      </Box>
    </Box>
  );
};
