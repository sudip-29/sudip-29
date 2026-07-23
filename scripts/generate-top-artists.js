import fs from "fs";
import dotenv from "dotenv";
import { getTopArtists } from "./spotify.js";

dotenv.config();

async function generate() {
  let artists = [
    "Unavailable",
    "Premium/API access required",
    "Will update automatically",
    "After next refresh",
    "🎵"
  ];

  try {
    const data = await getTopArtists();

    if (data.items) {
      artists = data.items.map((artist, index) =>
        `${index + 1}. ${artist.name}`
      );
    }
  } catch (err) {
    console.log(err.response?.status);
    console.log(err.response?.data);
  }

  const svg = `
<svg width="600" height="260" xmlns="http://www.w3.org/2000/svg">
<style>
.title { fill:#1DB954; font:700 24px Arial; }
.text { fill:#ffffff; font:18px Arial Bold; }
</style>

<rect width="100%" height="100%" rx="20" fill="#121212"/>

<text x="30" y="45" class="title">🎤 Top Artists</text>

${artists
  .map(
    (artist, i) =>
      `<text x="30" y="${90 + i * 30}" class="text">${artist}</text>`
  )
  .join("")}

</svg>
`;

  fs.mkdirSync("assets", { recursive: true });
  fs.writeFileSync("assets/spotify-top-artists.svg", svg);

  console.log("✅ Top Artists SVG generated");
}

generate();