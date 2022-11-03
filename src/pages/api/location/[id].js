import client from 'Query'

export default async function handler(req, res) {
  const id = req.query.id

  try {
    const data = await client.query(`select * from public.location where id='${id}'`)
    // console.log(data)
    if (data.rowCount === 0) {
      throw `No location with id=${id} found!💥`
    }
    res.status(200).json({
      message: 'ok',
      body: data.rows[0]
    })
  } catch (err) {
    res.status(404).json({
      message: 'Some error occured',
      error: err
    })
  }
}
