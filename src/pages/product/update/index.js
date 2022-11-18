// ** MUI Imports
import Grid from '@mui/material/Grid';
import { server } from 'config/index.js';

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

// ** Demo Components Imports
import UpdateProduct from 'src/views/form-layouts/UpdateProduct';
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons';
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator';
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment';
// ** MUI Imports
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
import { useEffect, useState } from 'react';

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState('');

  useEffect(() => {
    fetch(`${server}/api/product`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.body);
      });
  }, []);

  const handleChange = (event) => {
    setCurrentProduct(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <Box sx={{ minWidth: 120, mb: '20px' }}>
        <FormControl sx={{ width: '50%', marginLeft: '25%' }}>
          <InputLabel id="demo-simple-select-label">Products</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentProduct}
            label="Products"
            onChange={handleChange}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.name}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12} md={12}>
            <UpdateProduct
              currentProduct={products.find((el) => el.name === currentProduct)}
            />
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </>
  );
};

export default Home;
