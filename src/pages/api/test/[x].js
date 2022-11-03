export default function handler(req, res) {
  const { query } = req;
  console.log(query);

  res.status(200).json({ message: "ok" });
}
