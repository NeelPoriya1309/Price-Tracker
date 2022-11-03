import client from './../../../../Query'
const crypto = require('crypto')

const AddLocations = async max => {
  const house_no = [
    'A213',
    'B209',
    'C109',
    '12',
    '49',
    '19',
    '01',
    'D1109',
    'A1003',
    'B120',
    'C708',
    'A401',
    'C509',
    '45',
    '23'
  ]
  const street_address_1 = [
    'Anand Vihar',
    'Archway',
    'Iskon Greens',
    'Iskon Platinum',
    'Iskon Flower',
    'Godrej Celeste',
    'Shrimay Oppulance',
    'Imperia Vista',
    'Shyam Eleganace',
    'Kavisha Panorama',
    'Shikhar Shantim',
    'Kavisha Urbania',
    'Sun City',
    'Sobo Center',
    'Aakash Homes'
  ]

  const street_address_2 = [
    'Nr. Iskon Green Road',
    'Opp. Jain Derasar',
    'Opp. Shalvik Shukan',
    'Nr. Iskon Mega Mall',
    'Nr. Infocity',
    'Nr. Sargasan Cross Road',
    'Opp. The Grand Bhagwati',
    'Nr. Aashram Road',
    'Nr. Patang Hotel',
    'Nr. Saraswati Hospital',
    'Nr. Krishna Shelby Hospital',
    'Nr. Satellite Road',
    'Opp. Sobo Center'
  ]

  const city = [
    'Ahmedabad',
    'Surat',
    'Rajkot',
    'Surendarnagar',
    'Pune',
    'Mumbai',
    'Hydrabad',
    'Telangana',
    'Delhi',
    'Gandhinagar',
    'Kolkata',
    'Jaipur',
    'Agra',
    'Nashik',
    'Varanasi'
  ]

  const state = [
    'Gujarat',
    'Gujarat',
    'Gujarat',
    'Gujarat',
    'Gujarat',
    'Maharashtra',
    'Andhra Pradesh',
    'Goa',
    'Rajasthan'
  ]
  let queries = []
  for (let i = 0; i < max; i++) {
    let data = {
      id: crypto.randomBytes(16).toString('hex'),
      house_no: house_no[Math.floor(Math.random() * state.length)],
      street_address_1: street_address_1[Math.floor(Math.random() * street_address_1.length)],
      street_address_2: street_address_2[Math.floor(Math.random() * street_address_2.length)],
      city: city[Math.floor(Math.random() * city.length)],
      state: state[Math.floor(Math.random() * state.length)],
      country: 'India'
    }
    data = Object.values(data).join("', '")
    const queryString = `insert into location values ('${data}')`

    queries.push(queryString)
    // await query(queryString);
  }

  let queryPromises = queries.map(el => query(el))
  await Promise.all(queryPromises)
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Randomly generated locations
    // await AddLocations(20);
    const data = await client.query('select * from public.location')
    res.status(200).json({ message: 'ok', length: data.rows.length, body: data.rows })
  } else if (req.method === 'POST') {
    const data = Object.values(req.body).join("', '")
    const queryString = `insert into public.location values ('${crypto.randomBytes(16).toString('hex')}', '${data}')`
    console.log(queryString)

    try {
      await client.query(queryString)
    } catch (err) {
      res.status(400).json({ message: 'error', body: err })
      return
    }

    res.status(201).json({ message: 'inserted' })
  } else {
    res.status(404).json({ message: 'invalid request!' })
  }
}
