import client from '../../../../Client';
const crypto = require('crypto');

const tableName = 'public.dealimages';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await client.query(`select * from ${tableName}`);
    res
      .status(200)
      .json({ message: 'ok', length: data.rows.length, body: data.rows });
  } else if (req.method === 'POST') {
    let attributes = '',
      values = '';
    Object.entries(req.body).map(([key, value]) => {
      attributes += `${key},`;
      values += `'${value}',`;
    });

    const queryString = `insert into ${tableName} (${attributes.slice(
      0,
      attributes.length - 1
    )}) values (${values.slice(0, values.length - 1)}) returning *`;

    console.log(queryString);
    try {
      const data = await client.query(queryString);

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
