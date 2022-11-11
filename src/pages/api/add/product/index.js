import client from 'Client';
import crypto from 'crypto';
import dummyData from './data.json';

const axios = require('axios');
const Products = require('Products');

const addProduct = async (product) => {
  //check if company is already there,
  // if yes, then get it's id
  const companyCheck = `SELECT * FROM company WHERE name = '${product.company}'`;
  const companyCheckResult = await client.query(companyCheck);
  let companyID;

  // console.log(companyCheckResult);
  if (companyCheckResult.rowCount === 0) {
    companyID = crypto.randomBytes(16).toString('hex');
    const companyQuery = `INSERT INTO company VALUES ('${companyID}','${product.company}') RETURNING *`;
    const companyResult = await client.query(companyQuery);
  }
  //else insert a new one
  else {
    companyID = companyCheckResult.rows[0].id;
  }

  //check if category is already there,
  // if yes, then get it's id
  const categoryCheck = `SELECT * FROM category WHERE name = '${product.category}'`;
  const categoryCheckResult = await client.query(categoryCheck);
  let categoryID;

  // console.log(categoryCheckResult);
  if (categoryCheckResult.rowCount === 0) {
    categoryID = crypto.randomBytes(16).toString('hex');
    const categoryQuery = `INSERT INTO category VALUES ('${categoryID}','${product.category}') RETURNING *`;
    const categoryResult = await client.query(categoryQuery);
  }
  //else insert a new one
  else {
    categoryID = categoryCheckResult.rows[0].id;
  }

  //insert product

  const newProduct = Object.assign(product, {
    company: companyID,
    category: categoryID,
  });

  const addRequest = await fetch('http://localhost:3000/api/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });

  await addRequest.json();
  return Promise.resolve();
};

export default async function handler(req, res) {
  for (let i = 0; i < Products.length; i++) {
    await addProduct(Products[i]);
  }
  res.status(200).json({ message: `ok! Inserted ${Products.length} products` });
}
