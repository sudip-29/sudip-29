import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { getMovie, downloadPoster } from "./omdb.js";

dotenv.config();

const favorites = JSON.parse(
  fs.readFileSync("data/favorite-movies.json", "utf8")
);

async function generate() {
  let cards = "";

  const cardWidth = 360;
  const cardHeight = 180;
  const margin = 20;

  let index = 0;

  for (const movie of favorites) {
    try {
      console.log(`Fetching: ${movie.title}`);

      const info = await getMovie(movie.title);

      const filename =
        info.Title
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "-") + ".jpg";

      await downloadPoster(info.Poster, filename);

      const posterPath = path.join(
        "assets",
        "posters",
        filename
      );

      const posterBase64 = fs.readFileSync(
        posterPath,
        {
          encoding: "base64",
        }
      );

      const x =
        20 +
        (index % 2) *
          (cardWidth + margin);

      const y =
        60 +
        Math.floor(index / 2) *
          (cardHeight + margin);

      cards += `
      <g>

        <rect
          x="${x}"
          y="${y}"
          width="${cardWidth}"
          height="${cardHeight}"
          rx="15"
          fill="#161b22"
        />

        <image
          href="data:image/jpeg;base64,${posterBase64}"
          x="${x + 15}"
          y="${y + 15}"
          width="100"
          height="150"
        />

        <text
          x="${x + 130}"
          y="${y + 35}"
          fill="white"
          font-size="18"
          font-weight="bold">
          ${info.Title}
        </text>

        <text
          x="${x + 130}"
          y="${y + 65}"
          fill="#8b949e"
          font-size="14">
          📅 ${info.Year}
        </text>

        <text
          x="${x + 130}"
          y="${y + 90}"
          fill="#8b949e"
          font-size="14">
          ⭐ IMDb ${info.imdbRating}
        </text>

        <text
          x="${x + 130}"
          y="${y + 115}"
          fill="#8b949e"
          font-size="14">
          ${info.Genre}
        </text>

      </g>
      `;

      index++;

    } catch (err) {
      console.error(
        `Failed to fetch ${movie.title}:`,
        err.message
      );
    }
  }

  const rows = Math.ceil(index / 2);

  const svgHeight =
    rows *
      (cardHeight + margin) +
    80;

  const svg = `
<svg
xmlns="http://www.w3.org/2000/svg"
width="800"
height="${svgHeight}">

<rect
width="100%"
height="100%"
fill="#0d1117"/>

<text
x="20"
y="35"
fill="white"
font-size="24"
font-weight="bold">

🎬 Favorite Movies

</text>

${cards}

</svg>
`;

  fs.writeFileSync(
    "assets/favorite-movies.svg",
    svg
  );

  console.log(
    "✅ Favorite Movies Generated"
  );
}

generate();