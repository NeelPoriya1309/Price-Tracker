import client from './../../../../../Client';
const crypto = require('crypto');

const AddLocations = async (max) => {
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
    '23',
  ];
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
    'Aakash Homes',
  ];

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
    'Opp. Sobo Center',
  ];

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
    'Varanasi',
  ];

  const state = [
    'Gujarat',
    'Gujarat',
    'Gujarat',
    'Gujarat',
    'Gujarat',
    'Maharashtra',
    'Andhra Pradesh',
    'Goa',
    'Rajasthan',
  ];
  let queries = [];
  for (let i = 0; i < max; i++) {
    let data = {
      id: crypto.randomBytes(16).toString('hex'),
      house_no: house_no[Math.floor(Math.random() * state.length)],
      street_address_1:
        street_address_1[Math.floor(Math.random() * street_address_1.length)],
      street_address_2:
        street_address_2[Math.floor(Math.random() * street_address_2.length)],
      city: city[Math.floor(Math.random() * city.length)],
      state: state[Math.floor(Math.random() * state.length)],
      country: 'India',
    };
    data = Object.values(data).join("', '");
    const queryString = `insert into location values ('${data}')`;

    queries.push(queryString);
    // await query(queryString);
  }

  let queryPromises = queries.map((el) => client.query(el));
  return Promise.all(queryPromises);
};

export default async function handler(req, res) {
  const num = req.query.num;

  try {
    const data = await AddLocations(num);
    console.log('Done');
    res.status(200).json({ message: 'ok', body: data });
  } catch (err) {
    res.status(404).json({ message: 'some error occured', body: err });
  }
}
