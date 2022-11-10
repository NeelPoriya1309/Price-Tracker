import crypto, { randomInt } from 'crypto';

function calculate_age(dob) {
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

const addUser = async () => {
  const randomUser = await fetch('https://random-data-api.com/api/v2/users');
  const randomUser2 = await fetch('https://random-data-api.com/api/v2/users');
  const data = await randomUser.json();
  const data2 = await randomUser2.json();

  const user = {
    name: {
      first_name: data.first_name,
      middle_name: data2.first_name,
      last_name: data.last_name,
    },
    email: data.email,
    gender: data.gender,
    username: data.username,
    date_of_birth: data.date_of_birth,
    password: data.password,
    age: calculate_age(new Date(data.date_of_birth)),
    address: {
      house_no: randomInt(1, 100),
      street_address_1: data.address.street_name,
      street_address_2: data.address.street_address,
      city: data.address.city,
      state: data.address.state,
      country: data.address.country,
    },
    profile_picture: {
      image_url: `https://avatars.dicebear.com/api/micah/${data.username}.svg`,
    },
  };

  const createUserRequest = await fetch('http://localhost:3000/api/user', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return createUserRequest.json();
};

export default async function handler(req, res) {
  const num = req.query.num;
  const users = [];

  for (let i = 0; i < num; ++i) {
    users.push(addUser());
  }

  await Promise.all(users);

  res.status(200).json({ message: 'ok' });
}
