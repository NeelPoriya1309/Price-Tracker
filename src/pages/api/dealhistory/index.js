import client from '../../../../Client';
const crypto = require('crypto');

const tableName = 'public.dealhistory';
const foreignKeys = [];
const foriegnKeyToTableName = {};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await client.query(`select * from ${tableName}`);
    res
      .status(200)
      .json({ message: 'ok', length: data.rows.length, body: data.rows });
  } else if (req.method === 'POST') {
    const foreignIds = [];
    let attributes = 'id,',
      values = `'${crypto.randomBytes(16).toString('hex')}',`;

    foreignKeys.forEach((key) => {
      if (req.body[key]) attributes += `${key},`;
    });

    const insertedForeignKeys = foreignKeys.map(async (key) => {
      if (req.body[key]) {
        const response = await fetch(
          `http://localhost:3000/api/${foriegnKeyToTableName[key]}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body[key]),
          }
        );

        return response.json();
      }
    });

    const resolvedForeignKeys = await Promise.all(insertedForeignKeys);

    resolvedForeignKeys.forEach(async (el) => {
      if (el) {
        foreignIds.push(`${el.body.id}`);
        values += `'${foreignIds[foreignIds.length - 1]}',`;
      }
    });

    Object.entries(req.body).map(([key, value]) => {
      if (foreignKeys.includes(key)) return;
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

      res.status(201).json({
        message: 'inserted',
        body: { id: data.rows[0].id },
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
