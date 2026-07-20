import express from "express";
import open from "open";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const PORT = 8888;

const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-top-read"
].join(" ");

const authURL =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    scope: scopes,
    redirect_uri: process.env.REDIRECT_URI,
  });

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.send("Authorization failed.");
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.SPOTIFY_CLIENT_ID,
          password: process.env.SPOTIFY_CLIENT_SECRET,
        },
      }
    );

    const { refresh_token, access_token } = response.data;

    console.log("\n✅ Access Token:\n");
    console.log(access_token);

    console.log("\n✅ Refresh Token:\n");
    console.log(refresh_token);

    res.send(`
      <h2>🎉 Success!</h2>
      <p>Your Refresh Token has been generated.</p>
      <p>You can now close this window.</p>
    `);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.send("Failed to get refresh token.");
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
  await open(authURL);
});