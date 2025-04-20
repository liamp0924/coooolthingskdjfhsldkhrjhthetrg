export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { username, avatar } = req.body;
  
    if (!username || !avatar) {
      return res.status(400).json({ error: "Missing username or avatar" });
    }
  
    try {
      // 1. Fetch existing profiles
      const response = await fetch("https://pastebin.com/raw/AsHTgxvc");
      const data = await response.json();
  
      // 2. Check if username already exists
      if (data.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        return res.status(409).json({ error: "Username already taken" });
      }
  
      // 3. Add the new user
      const newUser = { username, avatar };
      const updatedData = [...data, newUser];
  
      // 4. Simulate saving (since we can't auto-save back to Pastebin raw link)
      console.log("⬇️ COPY THIS INTO PASTEBIN:");
      console.log(JSON.stringify(updatedData, null, 2));
  
      // Respond to user
      res.status(200).json({ success: true, message: "Profile created. Paste this in Pastebin console.", newUser });
  
    } catch (err) {
      console.error("Error updating profile:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  