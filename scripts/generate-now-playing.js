import fs from "fs";
import dotenv from "dotenv";
import { getNowPlaying, downloadAlbumCover } from "./spotify.js";

dotenv.config();

async function generate() {
  try {
    const data = await getNowPlaying();

    let title = "Nothing Playing";
    let artist = "Spotify is currently idle";
    let albumArt = "https://i.scdn.co/image/ab67616d0000b273000000000000000000000000";
    let albumArtBase64 = fs.readFileSync(
        "assets/spotify/default-album.jpg",
        "base64"
    );

    if (data && data.item) {
      title = data.item.name;
      artist = data.item.artists.map(a => a.name).join(", ");
      albumArt = data.item.album.images[0].url;

      const albumPath = await downloadAlbumCover(albumArt);

      albumArtBase64 = fs.readFileSync(albumPath, "base64");
    }

    const status = data?.is_playing
      ? "🎵 Currently Listening"
      : "⏸️ Nothing Playing";

    const svg = `
<svg width="600" height="170" xmlns="http://www.w3.org/2000/svg">
<style>
.title{fill:#ffffff;font:700 22px Arial;}
.artist{fill:#b3b3b3;font:18px Arial;}
</style>

<rect width="100%" height="100%" rx="20" fill="#121212"/>

<image
  href="data:image/jpeg;base64,${albumArtBase64}"
  x="20"
  y="20"
  width="130"
  height="130"/>
  
<text x="170" y="60" class="title">${title}</text>
<text x="170" y="95" class="artist">${artist}</text>

<text
x="170"
y="135"
fill="#1DB954"
font-size="18"
font-family="Arial">
${status}
</text>

</svg>
`;

    fs.mkdirSync("assets", { recursive: true });
    fs.writeFileSync("assets/spotify-now-playing.svg", svg);

    console.log("✅ assets/spotify-now-playing.svg generated");
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

generate();