import dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;


export async function getAccessToken() {
  const response = await axios.post(
    "https://accounts.spotify.com/api/token",
    new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: CLIENT_ID,
        password: CLIENT_SECRET,
      },
    }
  );

  return response.data.access_token;
}

async function spotifyRequest(endpoint) {
  const token = await getAccessToken();

  const response = await axios.get(
    `https://api.spotify.com/v1/${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function getNowPlaying() {
  return await spotifyRequest("me/player/currently-playing");
}

export async function getTopArtists() {
  return await spotifyRequest("me/top/artists?limit=5");
}

export async function getTopTracks() {
  return await spotifyRequest("me/top/tracks?limit=5");
}