import fs from "fs";
import dotenv from "dotenv";
import { getMovie, downloadPoster } from "./omdb.js";

dotenv.config();

const favorites = JSON.parse(
  fs.readFileSync("data/favorite-movies.json", "utf8")
);

async function generate() {
  let cards = "";
  let y = 40;

  for (const movie of favorites) {
    try {

        console.log(`Fetching: ${movie.title}`);

        const info = await getMovie(movie.title);

        const filename =
            info.Title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, "-") + ".jpg";

        await downloadPoster(info.Poster, filename);

        cards += `
        <g>

            <image
                href="posters/${filename}"
                x="20"
                y="${y}"
                width="100"
                height="150"/>

            <text x="140" y="${y+25}" fill="white">${info.Title}</text>

            <text x="140" y="${y+50}" fill="#bbbbbb">
                📅 ${info.Year}
            </text>

            <text x="140" y="${y+75}" fill="#bbbbbb">
                ⭐ ${info.imdbRating}
            </text>

            <text x="140" y="${y+100}" fill="#bbbbbb">
                ${info.Genre}
            </text>

        </g>
        `;

        y += 100;

    } catch(err) {

        console.error(`Failed to fetch ${movie.title}:`, err.message);

    }
}
const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="800"
     height="${y + 20}">

<rect width="100%" height="100%" fill="#0d1117"/>

<text
    x="20"
    y="25"
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

console.log("✅ Favorite Movies Generated");
}

generate();