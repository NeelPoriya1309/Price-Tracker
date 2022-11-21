import clientConfig from 'clientConfig';
import { Client } from 'pg';
const crypto = require('crypto');

const tableName = 'public.product';
const foreignKeys = ['image'];
const foriegnKeyToTableName = {
  image: 'image',
};

export default async function handler(req, res) {
  const client = new Client(clientConfig);
  await client.connect();
  console.log('Connected🚀');

  if (req.method === 'GET') {
    const data = await client.query(
      `select id, name, base_price, company_id, company_name, category_id, category_name, image_id, image_url, description from ((product inner join (select product.id product_company_id, company.id company_id, company.name company_name  from product inner join company on product.company = company.id) as f1 on f1.product_company_id = product.id) as f2 inner join (select product.id product_image_id, image.id image_id, image.image_url  from product inner join image on product.image = image.id) as f3 on f2.product_company_id = f3.product_image_id) as f4 inner join (select product.id product_category_id, category.id category_id, category.name category_name  from product inner join category on product.category = category.id) as f5 on f4.id = f5.product_category_id`
    );
    await client.end();
    console.log('Connection closed🔒');
    res
      .status(200)
      .json({ message: 'ok', length: data.rows.length, body: data.rows });
  } else {
    res.status(404).json({ message: 'invalid request!' });
  }
}
