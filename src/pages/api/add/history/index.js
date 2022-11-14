import client from 'Client';

let productProbability = 0.6;

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export default async function handler(req, res) {
  const userDataRequest = await fetch('http://localhost:3000/api/user');
  const productDataRequest = await fetch('http://localhost:3000/api/product');

  const userData = await userDataRequest.json();
  const productData = await productDataRequest.json();

  const userIDs = userData.body.map((user) => user.id);
  const productIDs = productData.body.map((product) => product.id);

  let counter = 0;
  userIDs.forEach(async (id) => {
    productIDs.forEach(async (pid) => {
      if (Math.random() < productProbability) {
        let numberOfHistory = Math.floor(Math.random() * 10);
        for (let i = 0; i < numberOfHistory; i++) {
          counter++;
          const history = {
            users: id,
            product: pid,
            searched_on: getRandomDate(new Date(2020, 0, 1), new Date()),
          };
          const createFavouriteRequest = await fetch(
            'http://localhost:3000/api/history',
            {
              method: 'POST',
              body: JSON.stringify(history),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          await createFavouriteRequest.json();
        }
      }
    });
  });

  res.status(200).json({ message: `ok! Inserted ${counter} histories.` });
}
