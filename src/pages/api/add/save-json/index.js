import Products from './../../../../../Products';

const axios = require('axios');
const flatted = require('flatted');
const fs = require('fs');

export default async function handler(req, res) {
  for (let i = 14; i < Products.length; ++i) {
    const product = Products[i];
    const options = {
      method: 'GET',
      url: 'https://real-time-product-search.p.rapidapi.com/search',
      params: { q: product.name, country: 'in', language: 'en' },
      headers: {
        'X-RapidAPI-Key': '0e89421852msh17a915d4502932ep1c0e48jsn9e48b15464c1',
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
