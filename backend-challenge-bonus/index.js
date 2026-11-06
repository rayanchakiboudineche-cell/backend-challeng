const express = require("express");
const app = express();
app.use(express.json());

const lower = "abcdefghijklmnopqrstuvwxyz";
const upper = lower.toUpperCase();
const numbers = "0123456789";
const symbols = "!@#$%^&*";

function random(str) {
  return str[Math.floor(Math.random() * str.length)];
}

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my backend challenge bonus",
    description: "POST /username generates usernames from a name. POST /password generates a random password.",
  });
});

app.post("/username", (req, res) => {
  const name = req.body.name;
  if (typeof name !== "string" || name.trim() === "") {return res.status(400).json({ error: "name is required" });
  }
  const n = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  if (n === "") {
    return res.status(400).json({ error: "name is invalid" });
  }
  res.json({
    usernames: [
      n + "_dev",
      "real." + n,
      n + "_" + Math.floor(10 + Math.random() * 90),
    ],
  });
});

app.post("/password", (req, res) => {
  const { length = 16, include_uppercase = true, include_lowercase = true, include_numbers = true, include_symbols = true } = req.body;

  if (!Number.isInteger(length) || length < 8 || length > 128) {
    return res.status(400).json({ error: "length must be between 8 and 128" });
  }

  const sets = [];
  if (include_lowercase) sets.push(lower);
  if (include_uppercase) sets.push(upper);
  if (include_numbers) sets.push(numbers);
  if (include_symbols) sets.push(symbols);

  if (sets.length === 0) {
    return res.status(400).json({ error: "select at least one character type" });
  }

  let password = sets.map(random);
  const all = sets.join("");
  while (password.length < length) {
    password.push(random(all));
  }
  password.sort(() => Math.random() - 0.5);

  res.json({ password: password.join(""), length });
});

app.use((err, req, res, next) => {
  res.status(400).json({ error: "invalid JSON" });
});

app.listen(3000, () => console.log("Server running on port 3000"));