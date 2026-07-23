import {
    getUser,
    getRepos,
    getContributionData,
    getLanguages,
    getRecentRepos
} from "./github.js";

export async function loadGitHubData(username) {

    const [
        user,
        repos,
        contribution,
        languages,
        recentRepos
    ] = await Promise.all([
        getUser(username),
        getRepos(username),
        getContributionData(username),
        getLanguages(username),
        getRecentRepos(username)
    ]);

    return {
        user,
        repos,
        contribution,
        languages,
        recentRepos
    };
}                   