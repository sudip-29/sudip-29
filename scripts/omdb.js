import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OMDB_API_KEY;

export async function getMovie(title) {
  const { data } = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: API_KEY,
      t: title,
    },
  });

  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  return data;
}

export async function downloadPoster(url, filename) {
  if (!url || url === "N/A") return null;

  const folder = "assets/posters";

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const filepath = path.join(folder, filename);

  // Skip if already downloaded
  if (fs.existsSync(filepath)) {
    return filepath;
  }

  // Retry download up to 3 times
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`Downloading ${filename} (Attempt ${attempt})`);

      const response = await axios({
        url,
        method: "GET",
        responseType: "stream",
        timeout: 15000,
      });

      const writer = fs.createWriteStream(filepath);

      response.data.pipe(writer);

      await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
      });

      return filepath;

    } catch (err) {
      console.log(`Retry ${attempt} failed: ${err.message}`);

      if (attempt === 3) {
        throw err;
      }
    }
  }
}