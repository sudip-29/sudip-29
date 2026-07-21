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

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });

  const writer = fs.createWriteStream(filepath);

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", () => resolve(filepath));
    writer.on("error", reject);
  });
}