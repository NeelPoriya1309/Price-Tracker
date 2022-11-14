import { server } from 'config/index';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import TableStickyHeader from 'src/views/tables/TableStickyHeader';
import CardMobile from 'src/views/cards/CardMobile';
import axios from 'axios';
import flatted from 'flatted';

export const getStaticProps = async () => {
  const productReq = await axios.get(`${server}/api/product`);

  const productData = productReq.data.body;

  console.log(productData);

  const imagesReq = productData.map(async (product) => {
    return axios.get(`${server}/api/image/${product.image}`);
  });

  const imagesData = await Promise.all(imagesReq);
  const images = imagesData.map((image) => image.data.body);

  const finalProducts = [];
  for (let i = 0; i < productData.length; i++) {
    finalProducts.push({
      id: productData[i].id,
      name: productData[i].name,
      description: productData[i].description,
      base_price: productData[i].base_price,
      image: images[i].image_url,
    });
  }

  console.log(finalProducts);

  return {
    props: {
      products: finalProducts,
    },
  };
};

const Product = ({ products }) => {
  console.log(products);
  return (
    <>
      <Grid container spacing={6}>
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6}>
            <CardMobile product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Product;
