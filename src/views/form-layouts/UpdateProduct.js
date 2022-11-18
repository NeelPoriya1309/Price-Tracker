// ** React Imports
import { useEffect, useState } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

// ** Icons Imports
import { useRouter } from 'next/router';
import { server } from 'config/index';
import AccountOutline from 'mdi-material-ui/AccountOutline';
import InputAdornment from '@mui/material/InputAdornment';

const FormLayoutsBasic = ({ currentProduct }) => {
  const router = useRouter();

  console.log(currentProduct);

  const [values, setValues] = useState({
    name: '',
    base_price: '',
    description: '',
    image: '',
    category: '',
    company: '',
    id: '',
  });

  useEffect(() => {
    if (currentProduct === undefined) return;
    setValues({ ...currentProduct });
  }, [currentProduct]);

  const addProduct = async () => {
    //checking if all fields are filled
    if (
      values.name === '' ||
      values.description === '' ||
      values.base_price === '' ||
      values.category === '' ||
      values.company === '' ||
      values.image === ''
    ) {
      alert('Please fill all fields');
      return;
    }

    //checking if base_price is a number
    if (isNaN(values.base_price.slice(1))) {
      alert('Please enter a valid number for base price');
      return;
    }

    let query = await fetch(`${server}/api/company`);
    let companies = await query.json();

    let company_id = companies.body.find(
      (company) => company.name === values.company
    );

    if (company_id) {
      company_id = company_id.id;
    } else {
      const request = await fetch(`${server}/api/company`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.company,
        }),
      });
      const response = await request.json();
      company_id = response.body.id;
    }

    query = await fetch(`${server}/api/category`);
    let categories = await query.json();

    let category_id = categories.body.find(
      (category) => category.name === values.category
    );

    if (category_id) {
      category_id = category_id.id;
    } else {
      const request = await fetch(`${server}/api/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.category,
        }),
      });
      const response = await request.json();
      category_id = response.body.id;
    }

    const newProduct = {
      ...values,
      company: company_id,
      category: category_id,
    };

    console.log(newProduct);

    const response = await fetch(`${server}/api/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();

    console.log(data);

    const newProdID = data.body.id;
    await fetch(`${server}/api/productpricehistory/product/${newProdID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base_price: '₹' + values.base_price,
      }),
    });
    router.push('/product');
    alert('Product Inserted Successfully!');
  };

  return (
    <>
      <Card>
        <CardHeader
          title="Update Product Details Form"
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  placeholder="iPhone 14 Pro"
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="textarea"
                  label="Description"
                  placeholder="The best product which the world has ever seen🙂!"
                  value={values.description}
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Base Price"
                  placeholder="$99,900"
                  value={values.base_price}
                  onChange={(e) =>
                    setValues({ ...values, base_price: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  placeholder="Smart Phone"
                  value={values.category}
                  onChange={(e) =>
                    setValues({ ...values, category: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company"
                  placeholder="Vadilal"
                  value={values.company}
                  onChange={(e) =>
                    setValues({ ...values, company: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  placeholder="https://picsum.photos/1920/1080"
                  value={values.image}
                  onChange={(e) =>
                    setValues({ ...values, image: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start"></InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    gap: 5,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    onClick={addProduct}
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Add
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default FormLayoutsBasic;
