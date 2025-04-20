export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, avatar } = req.body;

  if (!username || !avatar) {
    return res.status(400).json({ error: "Missing username or avatar" });
  }

  try {
    const response = await fetch("https://pastebin.com/raw/AsHTgxvc");
    const data = await response.json();

    if (data.some(user => user.username.toLowerCase() === username.toLowerCase())) {
      return res.status(409).json({ error: "Username already taken" });
    }

    const newUser = { username, avatar };
    const updatedData = [...data, newUser];

    console.log("⬇️ COPY THIS TO PASTEBIN:");
    console.log(JSON.stringify(updatedData, null, 2));

    res.status(200).json({ success: true, newUser });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
