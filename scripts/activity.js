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

    const cardHeight = 70 + repos.length * 78;

    let rows = "";

    repos.forEach((repository, index) => {

        const rowY = 885 + index * 78;

        rows += `

${repo(470, rowY + 6, colors.blue)}

<a
href="${repository.html_url}"
target="_blank">

${text(
500,
rowY + 10,
repository.name,
18,
colors.white,
"bold"
)}

</a>

${star(500, rowY + 38, colors.pink)}

${text(
520,
rowY + 42,
repository.stargazers_count,
14,
colors.gray
)}

${fork(610, rowY + 38, colors.purple)}

${text(
630,
rowY + 42,
repository.forks_count,
14,
colors.gray
)}

${calendar(740, rowY + 38, colors.orange)}

${text(
760,
rowY + 42,
new Date(repository.updated_at).toLocaleDateString(
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
`
<line
x1="500"
y1="${rowY + 58}"
x2="980"
y2="${rowY + 58}"
stroke="#30363D"
stroke-width="1"/>
`
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
    cardHeight
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