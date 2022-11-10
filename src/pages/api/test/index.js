const fs = require('fs');
const flatted = require('flatted');

export default function handler(req, res) {
  const JSON_DATA = fs.readFileSync('./JSON_Data/iPhone 13 Pro.json', 'utf-8');
  const data = flatted.parse(JSON_DATA);

  res.status(200).json({ message: 'ok', data });
}
