import axios from 'axios';
import client from 'Client';

const extractMoney = (price) => {
  return price.replaceAll(',', '').split(' ')[0];
};

const extractPrice = (price) => {
  return +price.replaceAll(',', '').split(' ')[0].slice(1);
};
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function extractCurrency(price) {
  return price.replaceAll(',', '').split(' ')[0].slice(0, 1);
}

let counter = 0;

const addPPH = async (product) => {
  //get all deals of this product
  const data = await client.query(
    `SELECT id FROM deals WHERE product = '${product.id}'`
  );

  const dealIDs = data.rows.map((deal) => deal.id);
  // console.log(dealIDs);

  //get all deal history of this product
  const dealsHistory = [];
  for (let i = 0; i < dealIDs.length; i++) {
    const dealHistory = await client.query(
      `SELECT * FROM dealhistory WHERE deal = '${dealIDs[i]}'`
    );
    dealsHistory.push(dealHistory.rows);
  }
  if (dealsHistory.length === 0) {
    console.log(
      '\n\n\n\n\n\n\n\n\n\n\n\nNo Deal Data Found😧😧😧\n\n\n\n\n\n\n\n\n\n\n\n'
    );
    return;
  }
  //get all minimum prices of this product
  const minPrices = [];
  const minPricesIDs = [];

  for (let j = 0; j < 24; ++j) {
    let minMoney = extractMoney(dealsHistory[0][j].price);
    let id = dealsHistory[0][j].id;
    for (let i = 0; i < dealsHistory.length; ++i) {
      let current_min_price = extractPrice(minMoney);
      let current_price = extractPrice(dealsHistory[i][j].price);

      if (extractCurrency(minMoney) === '$') current_min_price *= 80;
      if (extractCurrency(dealsHistory[i][j].price) === '$')
        current_price *= 80;

      if (current_price < current_min_price && current_price > 5000) {
        minMoney = extractMoney(dealsHistory[i][j].price);
        id = dealsHistory[i][j].id;
      }
    }

    minPrices.push(minMoney);
    minPricesIDs.push(id);
  }

  console.log(minPrices);
  console.log(minPricesIDs);

  for (let i = 0; i < minPrices.length; ++i) {
    counter++;
    console.log('New Product Price History🤝');
    const productPriceHistory = {
      product: product.id,
      price: minPrices[i],
      dealhistory: minPricesIDs[i],
      recorded_at: dealsHistory[0][i].valid_from,
    };
    await axios.post(
      'http://localhost:3000/api/productpricehistory',
      productPriceHistory
    );
  }
  return Promise.resolve();
};

export default async function (req, res) {
  const data = await axios.get('http://localhost:3000/api/product');
  const products = data.data.body;

  for (let i = 26; i < products.length; ++i) {
    console.log('New Product👀');
    await addPPH(products[i]);
  }
  res.status(200).json({ message: `ok! Inserted ${counter} PPH` });
}
