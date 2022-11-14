import { server } from 'config/index';
import Grid from '@mui/material/Grid';
import CardMobile from 'src/views/cards/CardMobile';
import axios from 'axios';

export const getStaticProps = async () => {
  const productReq = await axios.get(`${server}/api/product`);

  const productData = productReq.data.body;

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

  return {
    props: {
      products: finalProducts,
    },
  };
};

const Product = ({ products }) => {
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
