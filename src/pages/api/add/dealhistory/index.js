const axios = require('axios');

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

export default async function handler(req, res) {
  // const dealDataRequest = await fetch('http://localhost:3000/api/deal');
  const dealDataRequest = await axios.get('http://localhost:3000/api/deal');

  const dealData = dealDataRequest.data;
  // const dealData = await dealDataRequest.json();

  //TODO: Please change this when you are inserting deals from scratch
  // make it return deal.id, no if checks💖
  let dealIDs = dealData.body.map((deal) => {
    if (
      deal.product === '18227b2254a7295f2fb8e25ee72371e3' ||
      deal.product === '7bb37da92b123cd04f5da12f2f5d47f4' ||
      deal.product === '8172c493a1e95304ab419934c9e77f46' ||
      deal.product === 'c39ae2ed16a3b802419cf4d5d73f98c0' ||
      deal.product === 'dd9f239da54d1637056029bab8a702ee'
    )
      return deal.id;
  });
  dealIDs = dealIDs.filter(function (element) {
    return element !== undefined;
  });

  console.log('Deals Found🙂');

  console.log(dealIDs);
  let counter = 0;

  // dealIDs.forEach(async (id, idx) => {
  for (let idx = 0; idx < dealIDs.length; idx++) {
    const id = dealIDs[idx];
    console.log('New Deal ID: ', id);
    const currency = extractCurrency(dealData.body[idx].price);
    let cur_price = extractPrice(dealData.body[idx].price);
    let discount = 0;

    // const somePromise = dates.map(async (date) => {
    for (let i = 0; i < dates.length; i++) {
      const date = dates[i];
      counter++;
      console.log('New Deal History🤝');
      cur_price = Math.round(discount * 0.01 * cur_price + cur_price);
      discount = randomInt(-20, 40);
      const dealhistory = {
        deal: id,
        price: `${currency}${cur_price}`,
        valid_from: date,
      };

      // await fetch('http://localhost:3000/api/dealhistory', {
      //   method: 'POST',
      //   body: JSON.stringify(dealhistory),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      await axios.post('http://localhost:3000/api/dealhistory', dealhistory);
    }
  }

  res.status(200).json({ message: `ok! Inserted ${counter} dealhistory.` });
}
