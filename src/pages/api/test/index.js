import { Pool } from "pg";
const crypto = require("crypto");

const ConnectToPostgres = async () => {
  const { Client } = require("pg");
  const client = new Client({
    host: "postgresql-93072-0.cloudclusters.net",
    port: 16756,
    user: "Neel",
    password: "12345678",
    database: "TestDB1",
  });

  const res = await client.connect();
  console.log("connected");

  const result = await client.query("select * from public.image");
  console.log(result.rows);

  //   client.query(`insert into image values ('a', 'b');`);
  //   console.log("image added🥳");
};

export default function handler(req, res) {
  //   ConnectToPostgres();
  if (req.method === "POST") {
    console.log("received post request");
  } else {
    console.log(`Request received : ${req.method}`);
  }
  res
    .status(200)
    .json({ hello: "hi", _id: crypto.randomBytes(16).toString("hex") });
}
