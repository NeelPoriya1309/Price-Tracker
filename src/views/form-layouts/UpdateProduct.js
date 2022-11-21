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

  const [values, setValues] = useState({
    name: '',
    base_price: '',
    description: '',
    image_url: '',
    category_name: '',
    company_name: '',
    id: '',
    company_id: '',
    category_id: '',
    image_id: '',
  });

  useEffect(() => {
    if (currentProduct === undefined) return;
    setValues({ ...currentProduct });
  }, [currentProduct]);

  const updateProduct = async () => {
    //checking if all fields are filled
    if (
      values.name === '' ||
      values.description === '' ||
      values.base_price === '' ||
      values.category_name === '' ||
      values.company_name === '' ||
      values.image_url === ''
    ) {
      alert('Please fill all fields');
      return;
    }

    await fetch(`${server}/api/product/${values.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    alert('Product Updated🚀');
    window.location.reload();
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
                  value={values.category_name}
                  onChange={(e) =>
                    setValues({ ...values, category_name: e.target.value })
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
                  value={values.company_name}
                  onChange={(e) =>
                    setValues({ ...values, company_name: e.target.value })
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
                  value={values.image_url}
                  onChange={(e) =>
                    setValues({ ...values, image_url: e.target.value })
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
                    onClick={updateProduct}
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
