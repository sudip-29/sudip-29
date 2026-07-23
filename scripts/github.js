import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.CUSTOM_TOKEN_GITHUB;

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  },
});

export async function graphql(query) {
  const res = await api.post("/graphql", {
    query,
  });

  return res.data.data;
}

export async function rest(url) {
  const res = await api.get(url);
  return res.data;
}

export async function getUser(username) {
    return await rest(`/users/${username}`);
}

export async function getRepos(username){
    return await rest(`/users/${username}/repos?per_page=100`);
}

export async function getContributionData(username, year) {

  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year}-12-31T23:59:59Z`;
  const query = `
  {
    user(login: "${username}") {
      contributionsCollection(
        from: "${from}"
        to: "${to}"
      ) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }`;

  return await graphql(query);
}

export async function getLanguages(username) {

    const repos = await getRepos(username);

    const languages = {};

    for (const repo of repos) {

        if (repo.fork) continue;

        const data = await rest(repo.languages_url);

        for (const [lang, bytes] of Object.entries(data)) {
            languages[lang] = (languages[lang] || 0) + bytes;
        }
    }

    return languages;
}


export async function getRecentRepos(username) {
    return await rest(
        `/users/${username}/repos?sort=updated&per_page=5`
    );
}

export async function getProfileViews(username) {
    try {
        const res = await fetch(
            `https://komarev.com/ghpvc/?username=${username}`
        );

        const svg = await res.text();

        const match = svg.match(/>([\d,]+)<\/text>/);

        if (!match) return 0;

        return Number(match[1].replace(/,/g, ""));
    } catch (err) {
        console.error("Failed to fetch profile views:", err);
        return 0;
    }
}