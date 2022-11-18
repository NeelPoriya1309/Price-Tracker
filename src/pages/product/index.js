import { server } from './../../../config/index';
import Grid from '@mui/material/Grid';
import CardMobile from 'src/views/cards/CardMobile';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { PackageVariant } from 'mdi-material-ui';

const Product = () => {
  const [products, setProducts] = useState(undefined);

  useEffect(() => {
    axios.get(`${server}/api/product`).then((res) => {
      const productData = res.data.body;

      const imagesReq = productData.map(async (product) => {
        return axios.get(`${server}/api/image/${product.image}`);
      });

      Promise.all(imagesReq).then((res) => {
        const images = res.map((image) => image.data.body);

        const finalProducts = [];
        for (let i = 0; i < productData.length; i++) {
          finalProducts.push({
            id: productData[i].id,
            name: productData[i].name,
            description: productData[i].description,
            base_price: productData[i].base_price,
            image: images[i].image_url,
            url: productData[i].url,
          });
        }

        setProducts(finalProducts);
      });
    });
  }, []);

  return (
    <>
      <div>
        <h1>
          Products
          <PackageVariant
            sx={{
              fontSize: 'xxx-large',
              ml: '4px',
              mt: '0px',
              position: 'absolute',
              color: '#9860fd',
            }}
          />
        </h1>
      </div>
      {products && (
        <Grid container spacing={6}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6}>
              <CardMobile product={product} />
            </Grid>
          ))}
        </Grid>
      )}
      {!products && (
        <LoadingButton
          sx={{
            width: '100%',
            scale: '2',
            div: {
              color: '#232227',
            },
            marginBottom: '20px',
          }}
          loading
        />
      )}
    </>
  );
};

export default Product;
