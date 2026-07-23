import fs from "fs";

import { svg } from "./utils.js";
import { profile } from "./profile.js";
import { statCard } from "./stats.js";
import { contributionGraph } from "./graph.js";
import { languagesChart } from "./languages.js";
import { activity } from "./activity.js";

import { loadGitHubData } from "./githubData.js";
import { USERNAME } from "./constants.js";
import {
    PAGE_WIDTH,
    PAGE_HEIGHT
} from "./layout.js";
import { profileViews } from "./profileViews.js";
import { contributionCalendar } from "./contributionCalendar.js";

export async function generateDashboard() {

    const {
        user,
        repos,
        contribution,
        languages,
        recentRepos,
        profileViewsCount
    } = await loadGitHubData(USERNAME);

    const calendar =
        contribution.user.contributionsCollection.contributionCalendar;

    let stars = 0;
    let forks = 0;

    repos.forEach(repo => {
        stars += repo.stargazers_count;
        forks += repo.forks_count;
    });

    const dashboard = svg(
        PAGE_WIDTH,
        PAGE_HEIGHT,

        `


${profile(user)}

${statCard(
440,
120,
"Total Stars",
stars,
"star",
"#FF7BCE"
)}

${statCard(
790,
120,
"Repositories",
user.public_repos,
"repo",
"#58A6FF"
)}

${statCard(
1140,
120,
"Followers",
user.followers,
"users",
"#3FB950"
)}

${statCard(
440,
320,
"Forks",
forks,
"fork",
"#BC8CFF"
)}

${statCard(
790,
320,
"Following",
user.following,
"user",
"#39C5CF"
)}

${statCard(
1140,
320,
"Contributions",
calendar.totalContributions,
"fire",
"#F0883E"
)}

${contributionGraph(calendar)}

${activity(recentRepos)}

${languagesChart(languages)}

${profileViews(profileViewsCount)}

${contributionCalendar(calendar)}


`
    );

    fs.writeFileSync(
        "assets/github-dashboard.svg",
        dashboard
    );

    console.log("✅ Dashboard Generated");
}

try {

    await generateDashboard();

} catch (error) {

    console.error("❌ Dashboard generation failed");
    console.error(error);

    process.exit(1);

}