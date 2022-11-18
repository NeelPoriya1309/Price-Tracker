// ** MUI Imports
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

// ** Demo Components Imports
import Table from 'src/views/tables/Table';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

const Home = () => {
  const [table, setTable] = useState('names');

  const handleChange = (event) => {
    setTable(event.target.value);
  };
  return (
    <>
      <Box sx={{ minWidth: 120, ml: '50%', mb: '20px' }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Table</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={table}
            label="Table"
            onChange={handleChange}
          >
            <MenuItem selected value={'names'}>
              Name
            </MenuItem>
            <MenuItem value={'user'}>Users</MenuItem>
            <MenuItem value={'admin'}>Admin</MenuItem>
            <MenuItem value={'category'}>Category</MenuItem>
            <MenuItem value={'company'}>Company</MenuItem>
            <MenuItem value={'dealhistory'}>DealHistory</MenuItem>
            <MenuItem value={'dealimages'}>DealImages</MenuItem>
            <MenuItem value={'deal'}>Deals</MenuItem>
            <MenuItem value={'favourites'}>Favorites</MenuItem>
            <MenuItem value={'feed'}>Feed</MenuItem>
            <MenuItem value={'feedback'}>Feedback</MenuItem>
            <MenuItem value={'history'}>History</MenuItem>
            <MenuItem value={'image'}>Image</MenuItem>
            <MenuItem value={'location'}>Location</MenuItem>
            <MenuItem value={'notification'}>Notification</MenuItem>
            <MenuItem value={'person'}>Person</MenuItem>
            <MenuItem value={'product'}>Product</MenuItem>
            <MenuItem value={'productpricehistory'}>
              ProductPriceHistory
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={`${table.toUpperCase()} TABLE`}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <Table tableName={table} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
