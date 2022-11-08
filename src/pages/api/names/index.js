import client from '../../../../Client';
const crypto = require('crypto');

const tableName = 'public.name';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await client.query(`select * from ${tableName}`);
    res
      .status(200)
      .json({ message: 'ok', length: data.rows.length, body: data.rows });
  } else if (req.method === 'POST') {
    const data = Object.values(req.body).join("', '");
    const newId = crypto.randomBytes(16).toString('hex');
    const attributes = Object.keys(req.body).join(', ');
    const queryString = `insert into ${tableName}(id, ${attributes}) values ('${newId}', '${data}')`;
    console.log(`Query Sent: \n` + queryString);

    try {
      await client.query(queryString);
    } catch (err) {
      res.status(400).json({ message: 'error', body: err });
      return;
    }

    res.status(201).json({
      message: 'inserted',
      body: {
        id: newId,
      },
    });
  } else {
    res.status(404).json({ message: 'invalid request!' });
  }
}
