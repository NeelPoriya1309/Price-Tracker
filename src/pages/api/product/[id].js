import { server } from 'config/index.js';
import clientConfig from 'clientConfig';
import { Client } from 'pg';
const crypto = require('crypto');

const tableName = 'public.product';

export default async function handler(req, res) {
  const client = new Client(clientConfig);
  await client.connect();
  console.log('Connected🚀');
  const id = req.query.id;

  if (req.method === 'GET') {
    try {
      const data = await client.query(
        `select * from ${tableName} where id='${id}'`
      );
      await client.end();
      console.log('Disconnected🔒');
      // console.log(data)
      if (data.rowCount === 0) {
        throw `No location with id=${id} found!💥`;
      }
      res.status(200).json({
        message: 'ok',
        body: data.rows[0],
      });
    } catch (err) {
      res.status(404).json({
        message: 'Some error occured',
        error: err,
      });
    }
    return;
  } else if (req.method === 'PATCH') {
    if (req.body.id !== id) {
      res.status(404).json({
        message: 'some error occured',
        error: 'ID must remain same for the query and body💥',
      });
      return;
    }

    const product = req.body;
    //do the image_url first
    await client.query(
      `update image set image_url='${product.image_url}' where id='${product.image_id}'`
    );

    //update company of the product
    const companyDetails = await client.query(
      `select * from company where name='${product.company_name}'`
    );
    if (companyDetails.rowCount === 0) {
      const newCompanyID = crypto.randomBytes(16).toString('hex');
      await client.query(
        `insert into company (id, name) values ('${newCompanyID}', '${product.company_name}')`
      );

      await client.query(
        `update product set company='${newCompanyID}' where id='${product.id}'`
      );
    } else {
      await client.query(
        `update product set company='${companyDetails.rows[0].id}' where id='${product.id}'`
      );
    }

    //update category of the product
    const categoryDeatils = await client.query(
      `select * from category where name='${product.category_name}'`
    );
    if (categoryDeatils.rowCount === 0) {
      const newCategoryID = crypto.randomBytes(16).toString('hex');
      await client.query(
        `insert into category (id, name) values ('${newCategoryID}', '${product.category_name}')`
      );

      await client.query(
        `update product set category='${newCategoryID}' where id='${product.id}'`
      );
    } else {
      await client.query(
        `update product set category='${categoryDeatils.rows[0].id}' where id='${product.id}'`
      );
    }

    await client.query(
      `update product set name='${product.name}', description='${product.description}', base_price='${product.base_price}' where id='${product.id}'`
    );

    client.end();
    res.status(200).json({ message: 'received something' });
    return;
  } else if (req.method === 'DELETE') {
    try {
      const response = await client.query(
        `delete from ${tableName} where id='${id}'`
      );
      await client.end();
      console.log('Disconnected🔒');

      if (response.rowCount === 0) {
        res.status(404).json({
          message: 'Some error occured',
          body: `No tuple present with id=${id}💥`,
        });
        return;
      }
      res.status(200).json({
        message: 'ok',
        body: 'Tuple deleted successfully',
      });
    } catch (err) {
      res.status(404).json({
        message: 'Some error occured',
        body: err,
      });
    }
    return;
  }

  res.status(404).json({
    message: 'Page not found!',
  });
}
