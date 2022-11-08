import client from './../../../../Client';

const tableName = 'public.history';

export default async function handler(req, res) {
  const id = req.query.id;

  if (req.method === 'GET') {
    try {
      const data = await client.query(
        `select * from ${tableName} where id='${id}'`
      );
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

    try {
      const updatedLocation = Object.entries(req.body)
        .map(([key, value]) => {
          return `${key}='${value}'`;
        })
        .join(', ');

      const pgResponse = await client.query(
        `update ${tableName} set ${updatedLocation} where id='${id}'`
      );
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
