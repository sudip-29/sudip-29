import {
    getUser,
    getRepos,
    getContributionData,
    getLanguages,
    getRecentRepos,
    getProfileViews
} from "./github.js";

import { selectedYear } from "./years.js";

export async function loadGitHubData(username) {

    const [
        user,
        repos,
        contribution,
        languages,
        recentRepos,
        profileViewsCount
    ] = await Promise.all([
        getUser(username),
        getRepos(username),
        getContributionData(username, selectedYear),
        getLanguages(username),
        getRecentRepos(username),
        getProfileViews(username)
    ]);

    return {
        user,
        repos,
        contribution,
        languages,
        recentRepos,
        profileViewsCount
    };
}