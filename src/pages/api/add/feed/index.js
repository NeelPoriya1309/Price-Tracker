import client from 'Client';

let probablity = 0.75;

export default async function handler(req, res) {
  const userDataRequest = await fetch('http://localhost:3000/api/user');
  const productDataRequest = await fetch('http://localhost:3000/api/category');

  const userData = await userDataRequest.json();
  const productData = await productDataRequest.json();

  const userIDs = userData.body.map((user) => user.id);
  const productIDs = productData.body.map((product) => product.id);

  userIDs.forEach(async (id) => {
    productIDs.forEach(async (pid) => {
      if (Math.random() < probablity) {
        const favourite = {
          users: id,
          category: pid,
        };
        const createFavouriteRequest = await fetch(
          'http://localhost:3000/api/feed',
          {
            method: 'POST',
            body: JSON.stringify(favourite),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        await createFavouriteRequest.json();
      }
    });
  });

  res.status(200).json({ message: 'ok' });
}
