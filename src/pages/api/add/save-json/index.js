import Products from './../../../../../Products';

const axios = require('axios');
const flatted = require('flatted');
const fs = require('fs');

export default async function handler(req, res) {
  for (let i = 30; i < 31; ++i) {
    const product = Products[i];
    const options = {
      method: 'GET',
      url: 'https://real-time-product-search.p.rapidapi.com/search',
      params: { q: product.name, country: 'us', language: 'en' },
      headers: {
        'X-RapidAPI-Key': 'ed3221f39bmsh6dc0eb1757fb755p1d6f61jsn9d57cda06548',
        'X-RapidAPI-Host': 'real-time-product-search.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);
    console.log(response);
    fs.writeFile(
      `./JSON_Data/${product.name}.json`,
      flatted.stringify(response.data.data),
      'utf-8'
    );
  }
  //   const jsonData = fs.readFileSync(`./${Products[0].name}.json`, 'utf-8');
  //   const data = flatted.parse(jsonData);
  res.status(200).json({ message: 'ok' });
}
