import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import {
  getAccessToken,
  //getNowPlaying,
  getTopArtists,
  getTopTracks,
} from "./spotify.js";

async function test() {
  try {
    // Check Spotify account
    const token = await getAccessToken();

    const me = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("👤 Spotify Account:");
    console.log(me.data);

    //console.log("\n🎵 Now Playing:");
    //console.log(await getNowPlaying());

    console.log("\n🎤 Top Artists:");
    console.log(await getTopArtists());

    console.log("\n🎵 Top Tracks:");
    console.log(await getTopTracks());

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

test();