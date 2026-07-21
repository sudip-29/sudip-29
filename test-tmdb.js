import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

try {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/20453`,
    {
      params: {
        api_key: process.env.TMDB_API_KEY,
      },
    }
  );

  console.log(data.title);
} catch (err) {
  console.log(err);
}