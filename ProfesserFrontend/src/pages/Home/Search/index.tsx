import { Box } from '@mui/material';
import { useState } from 'react';

import SearchForm from './SearchForm';
import SearchResult from './SearchResult';

const ChallengeOverview = () => {
  const [filter, setFilter] = useState<string>('');

  return (
    <>
      <Box>
        <SearchForm setFilter={setFilter} />
      </Box>
      <Box>
        <SearchResult filter={filter} />
      </Box>
    </>
  );
};

export default ChallengeOverview;
