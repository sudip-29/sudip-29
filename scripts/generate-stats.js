import fs from "fs";
import { rest } from "./github.js";

async function generateStats() {
  const username = "sudip-29";

  const user = await rest(`/users/${username}`);
  const repos = await rest(`/users/${username}/repos?per_page=100`);

  let stars = 0;
  let forks = 0;

  repos.forEach(repo => {
    stars += repo.stargazers_count;
    forks += repo.forks_count;
  });

  const created = new Date(user.created_at).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="230">
  <rect width="100%" height="100%" rx="20" fill="#161B22" stroke="#30363D"/>

  <text x="25" y="35" font-size="22" fill="#58A6FF" font-weight="bold">
    GitHub Stats
  </text>

  <text x="25" y="70" fill="#C9D1D9" font-size="16">👤 ${user.login}</text>
  <text x="25" y="100" fill="#C9D1D9" font-size="16">📦 Public Repos: ${user.public_repos}</text>
  <text x="25" y="130" fill="#C9D1D9" font-size="16">⭐ Stars: ${stars}</text>
  <text x="25" y="160" fill="#C9D1D9" font-size="16">🍴 Forks: ${forks}</text>
  <text x="25" y="190" fill="#C9D1D9" font-size="16">👥 Followers: ${user.followers}</text>

  <text x="240" y="100" fill="#C9D1D9" font-size="16">➡️ Following: ${user.following}</text>
  <text x="240" y="130" fill="#C9D1D9" font-size="16">📅 Joined: ${created}</text>
</svg>
`;

  fs.writeFileSync("assets/github-stats.svg", svg);

  console.log("✅ github-stats.svg generated");
}

generateStats().catch(console.error);