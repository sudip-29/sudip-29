import fs from "fs";
import dotenv from "dotenv";
import { getTopTracks } from "./spotify.js";

dotenv.config();

async function generate() {
  let tracks = [
    "Unavailable",
    "Premium/API access required",
    "Will update automatically",
    "After next refresh",
    "🎵"
  ];

  try {
    const data = await getTopTracks();

    if (data.items) {
      tracks = data.items.map(
        (track, index) => `${index + 1}. ${track.name} — ${track.artists[0].name}`
      );
    }
  } catch (err) {
    console.log("⚠ Unable to fetch tracks. Using placeholder.");
  }

  const svg = `
<svg width="600" height="260" xmlns="http://www.w3.org/2000/svg">
<style>
.title { fill:#1DB954; font:700 24px Arial; }
.text { fill:#ffffff; font:18px Arial; }
</style>

<rect width="100%" height="100%" rx="20" fill="#121212"/>

<text x="30" y="45" class="title">🎵 Top Tracks</text>

${tracks
  .map(
    (track, i) =>
      `<text x="30" y="${90 + i * 30}" class="text">${track}</text>`
  )
  .join("")}

</svg>
`;

  fs.mkdirSync("assets", { recursive: true });
  fs.writeFileSync("assets/spotify-top-tracks.svg", svg);

  console.log("✅ Top Tracks SVG generated");
}

generate();