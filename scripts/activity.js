import { card } from "./components.js";
import { text } from "./utils.js";
import { colors } from "./colors.js";
import {
    CONTENT_X,
    LEFT_PANEL_WIDTH,
    BOTTOM_Y,
    CARD_HEIGHT
} from "./layout.js";
import {
    repo,
    star,
    fork,
    calendar
} from "./icons.js";

export function activity(repos) {

    let rows = "";

    repos.forEach((repo, index) => {

        const rowY = 885 + index * 70;

        rows += `

${repo(470, rowY + 6, colors.blue)}

${text(
490,
rowY + 10,
repo.name,
18,
colors.white,
"bold"
)}

${star(490, rowY + 38, colors.pink)}

${text(
505,
rowY + 42,
repo.stargazers_count,
14,
colors.gray
)}

${fork(570, rowY + 38, colors.purple)}

${text(
585,
rowY + 42,
repo.forks_count,
14,
colors.gray
)}

${calendar(655, rowY + 38, colors.orange)}

${text(
672,
rowY + 42,
new Date(repo.updated_at).toLocaleDateString(
    "en-GB",
    {
        day: "2-digit",
        month: "short",
        year: "2-digit"
    }
),
14,
colors.gray
)}

${
index !== repos.length - 1
?
`<line
x1="470"
y1="${rowY + 60}"
x2="1010"
y2="${rowY + 60}"
stroke="#30363D"/>`
:
""
}

`;
    });

return `

${card(
    CONTENT_X,
    815,
    610,
    280
)}

${text(
725,
845,
"Recent Repositories",
20,
colors.white,
"bold",
"middle"
)}

${rows}

`;
}