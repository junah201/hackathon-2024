import SearchIcon from '@mui/icons-material/Search';
import { Grid, Button, IconButton, Box } from '@mui/material';
import { useForm } from 'react-hook-form';

import SearchForm2 from '@/components/forms/SearchForm';
import { RegisterField } from '@/constants';

interface SearchFormProps {
  setFilter: (filter: any) => void;
}

const SearchForm = ({ setFilter }: SearchFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterField>();

  return (
    <form onSubmit={handleSubmit((userInput) => setFilter(userInput.search))}>
      <Box
        display="flex"
        alignContent="center"
        alignItems="center"
        justifyContent="center"
        justifyItems="center"
      >
        <SearchForm2 control={control} />
        <IconButton type="submit">
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
};

export default SearchForm;
