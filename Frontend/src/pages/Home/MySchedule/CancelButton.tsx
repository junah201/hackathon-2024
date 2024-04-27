import { Button } from '@mui/material';

import { deleteScheduleById } from '@/api';
import { QUERY } from '@/constants';
import { useCustomMutation } from '@/lib';

interface CancelButtonProps {
  id: number;
}

const CancelButton = ({ id }: CancelButtonProps) => {
  const { mutate } = useCustomMutation(() => deleteScheduleById(id), {
    SuccessQueryKey: QUERY.KEY.MY_ALL_SCHEDULE,
    SuccessMessage: 'Schedule has been canceled successfully',
  });

  return (
    <Button color="error" variant="outlined" onClick={mutate}>
      Cancel
    </Button>
  );
};

export default CancelButton;
