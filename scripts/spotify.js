import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import fs from "fs";
import path from "path";

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
  const token = await getAccessToken();

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    if (err.response?.status === 204) {
      return null;
    }

    throw err;
  }
}

export async function getTopArtists() {
  return await spotifyRequest("me/top/artists?limit=5");
}

export async function getTopTracks() {
  return await spotifyRequest("me/top/tracks?limit=5");
}

export async function downloadAlbumCover(url) {
    if (!url || url === "N/A") return null;

    const folder = "assets/spotify";

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
    }

    const filepath = path.join(folder, "album.jpg");

    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
    });

    const writer = fs.createWriteStream(filepath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });

    return filepath;
}