import client from 'Client';
import fs from 'fs';
import Products from 'Products';
const flatted = require('flatted');

const addDeal = async (pt, data, res) => {
  if (data.length === 0) return new Promise.resolve();
  let productID;
  try {
    //get the product
    const product = await client.query(
      `SELECT * FROM product WHERE name='${pt.name}'`
    );
    if (product.rowCount === 0) {
      throw 'No Such product Found💥';
    }
    productID = product.rows[0].id;
  } catch (err) {
    res.status(500).json({ message: 'error', body: err });
  }

  //get the company
  const company = data.offer.store_name;
  let companyID;
  try {
    const cpy = await client.query(
      `SELECT * FROM company WHERE name='${company}'`
    );
    if (cpy.rowCount === 0) {
      const newCompanyRequest = await fetch(
        'http://localhost:3000/api/company',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: company }),
        }
      );

      const newCompany = await newCompanyRequest.json();
      companyID = newCompany.body.id;
    } else {
      companyID = cpy.rows[0].id;
    }
  } catch (err) {
    res.status(500).json({ message: 'error', body: err });
  }

  const newDeal = {
    valid_from: new Date().toISOString(),
    is_available: true,
    offering_company: companyID,
    deal_description: data.product_description,
    deal_title: data.product_title,
    product: productID,
    price: data.offer.price,
    url: data.offer.offer_page_url,
  };

  const newDealImages = data.product_photos.map(async (url) => {
    const newImage = await fetch('http://localhost:3000/api/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image_url: url }),
    });
    return newImage.json();
  });

  const newImagesPromies = await Promise.all(newDealImages);

  const newDealImagesID = newImagesPromies.map((el) => el.body.id);

  console.log(newDeal);
  console.log(newDealImagesID);

  const newDealRequest = await fetch('http://localhost:3000/api/deal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDeal),
  });
  const newDealResponse = await newDealRequest.json();

  return newDealImagesID.map(async (id) => {
    const something = await fetch('http://localhost:3000/api/dealimages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deal_id: newDealResponse.body.id,
        image_id: id,
      }),
    });
    return something.json();
  });
};

const doItForEachProduct = async (product, res) => {
  const name = product.name;

  const dataJSON = fs.readFileSync(`./JSON_Data/${name}.json`, 'utf-8');
  const data = flatted.parse(dataJSON);

  const newDeals = [];

  data.forEach(async (dt) => newDeals.push(addDeal(product, dt, res)));
  return Promise.all(newDeals);
};

export default async function handler(req, res) {
  const newDealsSuper = [];

  for (let i = 0; i < 1; i++) {
    newDealsSuper.push(doItForEachProduct(Products[i], res));
  }

  await Promise.all(newDealsSuper);

  res.status(200).json({ message: 'ok' });
}
