import clientConfig from 'clientConfig';
import { Client } from 'pg';
const crypto = require('crypto');

const dates = [
  new Date(),
  new Date(new Date().setMonth(new Date().getMonth() - 1)),
  new Date(new Date().setMonth(new Date().getMonth() - 2)),
  new Date(new Date().setMonth(new Date().getMonth() - 3)),
  new Date(new Date().setMonth(new Date().getMonth() - 4)),
  new Date(new Date().setMonth(new Date().getMonth() - 5)),

  new Date(new Date().setMonth(new Date().getMonth() - 6)),
  new Date(new Date().setMonth(new Date().getMonth() - 7)),
  new Date(new Date().setMonth(new Date().getMonth() - 8)),
  new Date(new Date().setMonth(new Date().getMonth() - 9)),
  new Date(new Date().setMonth(new Date().getMonth() - 10)),
  new Date(new Date().setMonth(new Date().getMonth() - 11)),

  new Date(new Date().setMonth(new Date().getMonth() - 12)),
  new Date(new Date().setMonth(new Date().getMonth() - 13)),
  new Date(new Date().setMonth(new Date().getMonth() - 14)),
  new Date(new Date().setMonth(new Date().getMonth() - 15)),
  new Date(new Date().setMonth(new Date().getMonth() - 16)),
  new Date(new Date().setMonth(new Date().getMonth() - 17)),

  new Date(new Date().setMonth(new Date().getMonth() - 18)),
  new Date(new Date().setMonth(new Date().getMonth() - 19)),
  new Date(new Date().setMonth(new Date().getMonth() - 20)),
  new Date(new Date().setMonth(new Date().getMonth() - 21)),
  new Date(new Date().setMonth(new Date().getMonth() - 22)),
  new Date(new Date().setMonth(new Date().getMonth() - 23)),
];

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

const tableName = 'public.productpricehistory';

export default async function handler(req, res) {
  const client = new Client(clientConfig);
  await client.connect();
  console.log('Connected🚀');

  const id = req.query.id;

  if (req.method === 'GET') {
    try {
      const data = await client.query(
        `select * from ${tableName} where product='${id}'`
      );
      await client.end();
      console.log('Disconnected🔒');
      // console.log(data)
      if (data.rowCount === 0) {
        throw `No location with id=${id} found!💥`;
      }
      res.status(200).json({
        message: 'ok',
        body: data.rows,
      });
    } catch (err) {
      res.status(404).json({
        message: 'Some error occured',
        error: err,
      });
    }
    return;
  } else if (req.method === 'POST') {
    const t = await client.query(`SELECT NOW()`);

    let currentPrice =
      extractCurrency(req.body.base_price) + extractPrice(req.body.base_price);

    for (let i = 0; i < dates.length; i++) {
      const query = `INSERT INTO productpricehistory(id, price, recorded_at, product) VALUES ('${crypto
        .randomBytes(16)
        .toString('hex')}', '${currentPrice}', '${dates[
        i
      ].toISOString()}', '${id}')`;

      currentPrice =
        extractCurrency(currentPrice) +
        Math.round(
          extractPrice(currentPrice) +
            randomInt(-10, 20) * extractPrice(currentPrice) * 0.01
        );

      await client.query(query);
    }

    await client.end();
    console.log('Disconnected🔒');
    res.status(200).json({ message: 'ok' });
    return;
  } else if (req.method === 'PATCH') {
    if (req.body.id !== id) {
      res.status(404).json({
        message: 'some error occured',
        error: 'ID must remain same for the query and body💥',
      });
      return;
    }

    try {
      const updatedLocation = Object.entries(req.body)
        .map(([key, value]) => {
          return `${key}='${value}'`;
        })
        .join(', ');

      const pgResponse = await client.query(
        `update ${tableName} set ${updatedLocation} where id='${id}'`
      );
      await client.end();
      console.log('Disconnected🔒');
      if (pgResponse.rowCount === 0) {
        res.status(404).json({
          message: 'Some error occured',
          body: `No tuple present with id=${id}💥`,
        });
        return;
      }
      res.status(200).json({
        message: 'ok',
        body: 'Tuple updated successfully',
      });
    } catch (err) {
      res.status(404).json({
        message: 'Some error occured',
        error: err,
      });
    }
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
