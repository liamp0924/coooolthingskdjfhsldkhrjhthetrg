import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'users.json');
  const fileData = fs.readFileSync(filePath);
  const users = JSON.parse(fileData);

  if (req.method === 'GET') {
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { username, avatar } = req.body;

    if (!username || !avatar) {
      return res.status(400).json({ error: 'Missing username or avatar' });
    }

    const filtered = users.filter(u => u.username !== username);
    filtered.push({ username, avatar });

    fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
    return res.status(200).json({ success: true });
  }

  res.status(405).end(); // Method Not Allowed
}