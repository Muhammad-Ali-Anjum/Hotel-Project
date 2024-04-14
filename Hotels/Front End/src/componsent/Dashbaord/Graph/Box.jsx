import * as React from 'react';
import Box from '@mui/system/Box';

export default function BoxSystemProps() {
  return (
    <Box
      height={100}
      width={200}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid grey' }}
    >
        <h2>sale:45453 </h2>
     
    </Box>
  );
}