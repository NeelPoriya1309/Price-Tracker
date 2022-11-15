import clientConfig from 'clientConfig';
import { Client } from 'pg';
const crypto = require('crypto');

const tableName = 'public.favourites';

export default async function handler(req, res) {
  const client = new Client(clientConfig);
  await client.connect();
  console.log('Connected🚀');
  if (req.method === 'GET') {
    const data = await client.query(`select * from ${tableName}`);
    await client.end();
    console.log('Disconnected🔒');
    res
      .status(200)
      .json({ message: 'ok', length: data.rows.length, body: data.rows });
  } else if (req.method === 'POST') {
    let attributes = '',
      values = '';
    Object.entries(req.body).map(([key, value]) => {
      attributes += `${key},`;
      let newValue = value;
      if (typeof newValue === 'string') {
        newValue = newValue.replaceAll(`'`, `''`);
      }
      values += `'${newValue}',`;
    });

    const queryString = `insert into ${tableName} (${attributes.slice(
      0,
      attributes.length - 1
    )}) values (${values.slice(0, values.length - 1)}) returning *`;

    console.log(queryString);
    try {
      const data = await client.query(queryString);
      await client.end();
      console.log('Disconnected🔒');
      res.status(201).json({
        message: 'inserted',
        body: { id: data.rows[0] },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'error', body: err });
    }
    // res.status(500).json({ message: 'error', body: 'err' });
  } else {
    res.status(404).json({ message: 'invalid request!' });
  }
}
