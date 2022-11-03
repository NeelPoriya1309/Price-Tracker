import query from "../../../Query";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await query("select * from public.product");
    res.status(200).json({ message: "ok", body: data });
  } else {
    res.status(404).json({ message: "invalid request!" });
  }
}
