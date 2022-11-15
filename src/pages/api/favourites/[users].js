import clientConfig from 'clientConfig';
import { Client } from 'pg';

const tableName = 'public.favourites';

export default async function handler(req, res) {
  const client = new Client(clientConfig);
  await client.connect();
  console.log('Connected🚀');
  const id = req.query.users;

  if (req.method === 'GET') {
    try {
      const data = await client.query(
        `select * from ${tableName} where users='${id}'`
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
  } else if (req.method === 'DELETE') {
    try {
      const response = await client.query(
        `delete from ${tableName} where users='${id}'`
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
