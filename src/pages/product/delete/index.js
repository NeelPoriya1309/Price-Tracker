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
import { useEffect, useState } from 'react';
import { server } from 'config/index.js';
import axios from 'axios';
import { Button } from '@mui/material';

const Home = () => {
  const [Product, setProduct] = useState([]);
  const [curProduct, setCurProduct] = useState('');

  useEffect(() => {
    axios.get(`${server}/api/product`).then((data) => {
      console.log(data);
      console.log(data.data.body);
      setProduct(data.data.body);
    });
  }, []);

  return (
    <>
      <Box sx={{ minWidth: 500, ml: '40%', mb: '20px', width: '40%' }}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Product</InputLabel>
          <Select
            onChange={(e) => {
              console.log(e.target.value);
              setCurProduct(e.target.value);
            }}
            minWidth={500}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Product"
          >
            {Product.map((item, idx) =>
              idx === 1 ? (
                <MenuItem key={idx} value={item.id} selected>
                  {item.name}
                </MenuItem>
              ) : (
                <MenuItem key={idx} value={item.id}>
                  {item.name}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>
      <Button
        onClick={(event) => {
          console.log(curProduct);
          axios
            .delete(`${server}/api/product/${curProduct}`)
            .then((data) => {});

          alert('Product Deleted🗑️');
          window.location.reload();
        }}
        sx={{ marginLeft: '40%' }}
        type="submit"
        variant="contained"
        size="large"
      >
        Delete
      </Button>
    </>
  );
};

export default Home;
